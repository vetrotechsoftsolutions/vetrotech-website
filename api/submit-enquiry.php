<?php
declare(strict_types=1);

// Deploy this endpoint to the PHP-enabled public_html/api directory.
const ENQUIRY_RECIPIENT = 'rankridgeinstitution001@gmail.com';
const ENQUIRY_SUBJECT = 'New Contact Enquiry - Rankridge';
const ALLOWED_SERVICES = [
    'Software Development',
    'IT Consulting',
    'Web Development',
    'Cloud Solutions',
    'Digital Transformation',
    'Enterprise Solutions',
];

function respond(int $status, array $body): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

function clean_text(mixed $value, string $field, bool $multiline = false): string
{
    if (!is_string($value)) {
        respond(422, ['success' => false, 'message' => "Please provide a valid {$field}."]);
    }

    $value = str_replace(["\r\n", "\r"], "\n", trim($value));
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $value) ?? '';
    $value = str_replace("\t", ' ', $value);
    if (!$multiline) {
        $value = str_replace("\n", ' ', $value);
    }
    return trim($value);
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Use POST to submit this form.']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$requestScheme = !empty($_SERVER['HTTPS']) && strtolower((string) $_SERVER['HTTPS']) !== 'off'
    ? 'https'
    : 'http';
$requestUrl = parse_url($requestScheme . '://' . ($_SERVER['HTTP_HOST'] ?? ''));
$originUrl = $origin !== '' ? parse_url($origin) : false;
if ($origin !== '') {
    $requestPort = $requestUrl['port'] ?? ($requestScheme === 'https' ? 443 : 80);
    $originScheme = is_array($originUrl) ? strtolower($originUrl['scheme'] ?? '') : '';
    $originPort = is_array($originUrl)
        ? ($originUrl['port'] ?? ($originScheme === 'https' ? 443 : 80))
        : 0;
    if (
        !is_array($requestUrl)
        || !is_array($originUrl)
        || $originScheme !== $requestScheme
        || strtolower($originUrl['host'] ?? '') !== strtolower($requestUrl['host'] ?? '')
        || $originPort !== $requestPort
    ) {
        respond(403, ['success' => false, 'message' => 'This form can only be submitted from this website.']);
    }
}

$contentType = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]));
if ($contentType !== 'application/json') {
    respond(415, ['success' => false, 'message' => 'Submit the form using the website form.']);
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) {
    respond(413, ['success' => false, 'message' => 'Your enquiry is too large. Please shorten the message and try again.']);
}

$rawBody = file_get_contents('php://input');
if ($rawBody !== false && strlen($rawBody) > 20000) {
    respond(413, ['success' => false, 'message' => 'Your enquiry is too large. Please shorten the message and try again.']);
}
$input = json_decode($rawBody === false ? '' : $rawBody, true);
if (!is_array($input)) {
    respond(400, ['success' => false, 'message' => 'The enquiry could not be read. Please try again.']);
}

$submissionId = $input['submissionId'] ?? '';
if (!is_string($submissionId) || !preg_match('/^[a-f0-9-]{36}$/iD', $submissionId)) {
    respond(422, ['success' => false, 'message' => 'The submission expired. Please try again.']);
}

$fullName = clean_text($input['fullName'] ?? null, 'full name');
$email = clean_text($input['email'] ?? null, 'email address');
$phone = clean_text($input['phone'] ?? null, 'phone number');
$company = clean_text($input['company'] ?? '', 'company');
$service = clean_text($input['service'] ?? null, 'service');
$message = clean_text($input['message'] ?? null, 'message', true);

if (text_length($fullName) < 2 || text_length($fullName) > 120) {
    respond(422, ['success' => false, 'message' => 'Please enter a name between 2 and 120 characters.']);
}
if (filter_var($email, FILTER_VALIDATE_EMAIL) === false || text_length($email) > 254) {
    respond(422, ['success' => false, 'message' => 'Please enter a valid email address.']);
}
if (text_length($phone) > 40 || !preg_match('/^\+?[0-9().\s-]+$/D', $phone)) {
    respond(422, ['success' => false, 'message' => 'Please enter a valid phone number.']);
}
$phoneDigits = preg_replace('/\D/', '', $phone) ?? '';
if (strlen($phoneDigits) < 8 || strlen($phoneDigits) > 15) {
    respond(422, ['success' => false, 'message' => 'Please enter a valid phone number.']);
}
if (text_length($company) > 150) {
    respond(422, ['success' => false, 'message' => 'Please keep the company name under 150 characters.']);
}
if (!in_array($service, ALLOWED_SERVICES, true)) {
    respond(422, ['success' => false, 'message' => 'Please select a valid service.']);
}
if (text_length($message) < 10 || text_length($message) > 5000) {
    respond(422, ['success' => false, 'message' => 'Please provide a message between 10 and 5000 characters.']);
}

$fromAddress = getenv('CONTACT_FROM_EMAIL');
if ($fromAddress === false || filter_var($fromAddress, FILTER_VALIDATE_EMAIL) === false) {
    error_log('Contact form is not configured: CONTACT_FROM_EMAIL must be a valid domain mailbox.');
    respond(503, ['success' => false, 'message' => 'Enquiry submission is temporarily unavailable. Please try again later.']);
}

$statePath = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
    . DIRECTORY_SEPARATOR
    . 'vetrotech-enquiry-' . hash('sha256', __DIR__) . '.json';
$stateFile = @fopen($statePath, 'c+');
if ($stateFile === false || !flock($stateFile, LOCK_EX)) {
    if (is_resource($stateFile)) {
        fclose($stateFile);
    }
    error_log('Contact form could not open its submission lock file.');
    respond(503, ['success' => false, 'message' => 'Enquiry submission is temporarily unavailable. Please try again later.']);
}
if (!chmod($statePath, 0600)) {
    flock($stateFile, LOCK_UN);
    fclose($stateFile);
    error_log('Contact form could not restrict access to its submission lock file.');
    respond(503, ['success' => false, 'message' => 'Enquiry submission is temporarily unavailable. Please try again later.']);
}

$storedState = stream_get_contents($stateFile);
$sentSubmissions = $storedState === '' ? [] : json_decode($storedState, true);
if (!is_array($sentSubmissions)) {
    flock($stateFile, LOCK_UN);
    fclose($stateFile);
    error_log('Contact form submission lock file contains invalid data.');
    respond(503, ['success' => false, 'message' => 'Enquiry submission is temporarily unavailable. Please try again later.']);
}

$now = time();
foreach ($sentSubmissions as $id => $timestamp) {
    if (!is_int($timestamp) || $timestamp < $now - 604800) {
        unset($sentSubmissions[$id]);
    }
}
if (isset($sentSubmissions[$submissionId])) {
    flock($stateFile, LOCK_UN);
    fclose($stateFile);
    respond(200, ['success' => true, 'message' => 'Your enquiry has already been submitted.']);
}

$mailBody = implode("\n", [
    'New website contact enquiry',
    'Submitted: ' . date('Y-m-d H:i:s T'),
    '',
    'Full Name: ' . $fullName,
    'Business Email: ' . $email,
    'Phone Number: ' . $phone,
    'Company: ' . ($company !== '' ? $company : 'Not provided'),
    'Service Required: ' . $service,
    '',
    'Message:',
    $message,
]);
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: VetroTech Website <' . $fromAddress . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . PHP_VERSION,
];

if (!mail(ENQUIRY_RECIPIENT, ENQUIRY_SUBJECT, $mailBody, implode("\r\n", $headers))) {
    flock($stateFile, LOCK_UN);
    fclose($stateFile);
    error_log('PHP mail() failed while sending a contact enquiry.');
    respond(502, ['success' => false, 'message' => 'We could not send your enquiry. Your details are still here; please try again shortly.']);
}

$sentSubmissions[$submissionId] = $now;
$serializedState = json_encode($sentSubmissions);
$saved = $serializedState !== false
    && ftruncate($stateFile, 0)
    && rewind($stateFile)
    && fwrite($stateFile, $serializedState) === strlen($serializedState)
    && fflush($stateFile);
if (!$saved) {
    error_log('Contact form sent an enquiry but could not persist its duplicate-submission token.');
}
flock($stateFile, LOCK_UN);
fclose($stateFile);

respond(200, ['success' => true, 'message' => 'Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.']);

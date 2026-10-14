import nodemailer from "nodemailer";

const allowedServices = [
  "Software Development",
  "IT Consulting",
  "Web Development",
  "Cloud Solutions",
  "Digital Transformation",
  "Enterprise Solutions",
];

const requiredEnv = [
  "CONTACT_EMAIL_TO",
  "CONTACT_EMAIL_FROM",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
];

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function normalizeText(value, multiline = false) {
  if (typeof value !== "string") {
    return "";
  }

  const normalized = value.replace(/\r\n|\r/g, "\n").trim();
  const withoutTags = normalized.replace(/<[^>]*>/g, "");
  const cleaned = withoutTags.replace(/[\u0000-\u001F\u007F]/g, "");

  return multiline ? cleaned.trim() : cleaned.replace(/\s+/g, " ").trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return /^[+()\d\s.-]{8,40}$/.test(value) && digits.length >= 8 && digits.length <= 15;
}

async function readRequestBody(req) {
  if (req.body && typeof req.body === "object" && !Array.isArray(req.body)) {
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("The enquiry could not be read. Please try again.");
  }
}

export default async function submitEnquiry(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { success: false, message: "Use POST to submit this form." });
    return;
  }

  const contentType = String(req.headers["content-type"] || "").toLowerCase();
  if (!contentType.includes("application/json")) {
    sendJson(res, 415, { success: false, message: "Submit the form using the website form." });
    return;
  }

  let body;
  try {
    body = await readRequestBody(req);
  } catch {
    sendJson(res, 400, { success: false, message: "The enquiry could not be read. Please try again." });
    return;
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    sendJson(res, 400, { success: false, message: "The enquiry could not be read. Please try again." });
    return;
  }

  const submissionId = typeof body.submissionId === "string" ? body.submissionId : "";
  if (!/^[0-9a-fA-F-]{36}$/.test(submissionId)) {
    sendJson(res, 422, { success: false, message: "The submission expired. Please try again." });
    return;
  }

  const fullName = normalizeText(body.fullName);
  const email = normalizeText(body.email);
  const phone = normalizeText(body.phone);
  const company = normalizeText(body.company);
  const service = normalizeText(body.service);
  const message = normalizeText(body.message, true);

  if (fullName.length < 2 || fullName.length > 120) {
    sendJson(res, 422, { success: false, message: "Please enter a name between 2 and 120 characters." });
    return;
  }

  if (!isValidEmail(email)) {
    sendJson(res, 422, { success: false, message: "Please enter a valid business email." });
    return;
  }

  if (!isValidPhone(phone)) {
    sendJson(res, 422, { success: false, message: "Please enter a valid phone number." });
    return;
  }

  if (company.length > 150) {
    sendJson(res, 422, { success: false, message: "Please keep the company name under 150 characters." });
    return;
  }

  if (!allowedServices.includes(service)) {
    sendJson(res, 422, { success: false, message: "Please select a valid service." });
    return;
  }

  if (message.length < 10 || message.length > 5000) {
    sendJson(res, 422, {
      success: false,
      message: "Please provide a message between 10 and 5000 characters.",
    });
    return;
  }

  const missingConfig = requiredEnv.find((key) => !process.env[key] || String(process.env[key]).trim() === "");
  if (missingConfig) {
    console.error(`Contact form is not configured: missing environment variable ${missingConfig}.`);
    sendJson(res, 503, {
      success: false,
      message: "Enquiry submission is temporarily unavailable. Please try again later.",
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: email,
      subject: "New Contact Enquiry - VetroTech Soft Solutions",
      text: [
        "New website contact enquiry",
        `Submitted: ${new Date().toISOString()}`,
        "",
        `Full Name: ${fullName}`,
        `Business Email: ${email}`,
        `Phone Number: ${phone}`,
        `Company: ${company || "Not provided"}`,
        `Service Required: ${service}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    sendJson(res, 200, {
      success: true,
      message: "Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.",
    });
  } catch (error) {
    console.error("Contact form email send failed:", error);
    sendJson(res, 502, {
      success: false,
      message: "We could not send your enquiry right now. Please try again later.",
    });
  }
};

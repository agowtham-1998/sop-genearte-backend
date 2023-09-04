const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/generate-sop', (req, res) => {
  try {
    const {
      name,
      email,
      age,
      educationLevel,
      institute,
      studyField,
      workExperience,
      jobTitle,
      companyName,
      jobDuties,
      canadianInstitute,
      programOfStudy,
      applyingFrom,
      futureGoals,
      listeningScore,
      readingScore,
      speakingScore,
      writingScore,
      paidFirstYearTuition,
      paidGIC,
      gicAmount,
    } = req.body;

    // Check if required fields (name and email) are empty
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required fields.' });
    }

    // Additional validation for other required fields
    if (!age || !educationLevel || !institute || !studyField || !applyingFrom || !futureGoals) {
      return res.status(400).json({ error: 'Please fill out all required fields.' });
    }

    // Create an object to store all the field details
    const fieldDetails = {
      Name: name,
      Age: age,
      'Education Level': educationLevel,
      Institute: institute,
      'Study Field': studyField,
      'Work Experience': workExperience || 'N/A',
      'Job Title': jobTitle || 'N/A',
      'Company Name': companyName || 'N/A',
      'Job Duties': jobDuties || 'N/A',
      'Canadian Institute': canadianInstitute || 'N/A',
      'Program of Study': programOfStudy || 'N/A',
      'Applying From': applyingFrom,
      'Future Goals': futureGoals,
      'Listening Score': listeningScore || 'N/A',
      'Reading Score': readingScore || 'N/A',
      'Speaking Score': speakingScore || 'N/A',
      'Writing Score': writingScore || 'N/A',
      'Paid First Year Tuition': paidFirstYearTuition,
      'Paid GIC': paidGIC || 'N/A',
      'GIC Amount': gicAmount || 'N/A',
    };

    // Generate Statement of Purpose (SOP) based on the provided information
    const sopText = generateSOP(fieldDetails);

    // Send an email with the SOP and field details to the provided email address
    sendEmail(email, 'Your Statement of Purpose and Field Details', sopText);

    res.status(200).json({ message: 'SOP generated and email sent.' });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while generating the SOP.' });
  }
});

function generateSOP(fieldDetails) {
  // Create the SOP text using the field details
  let sopText = `Statement of Purpose for ${fieldDetails.Name}\n\nDear ${fieldDetails.Name},\n\n`;
  sopText += `Thank you for your interest in our program. Here are the details you provided:\n\n`;

  for (const key in fieldDetails) {
    sopText += `${key}: ${fieldDetails[key]}\n`;
  }

  return sopText;
}

function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'agowtham8991@gmail.com',
      pass: 'arfp nhel rcwj uawf',
    },
  });

  const mailOptions = {
    from: 'agowtham8991@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

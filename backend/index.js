const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

// Create connection to database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

const app = express();

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.use(cors());
app.use(express.json());

function logError(err, res) {
    console.error(err);
    res.status(500).send('Error retrieve data from database');
}

// Main route to query database with filters
app.post('/query', (req, res) => {
    // console.log(req.body);
    const { departments, cultures, periods, classifications, acquisitionMethods, keywords } = req.body;
    let query = `
SELECT ObjectID, AccessionNumber, Title, ObjectName, ObjectStatus, Dated, Classification, Materials, Dimensions, Description, eMuseumLabelText, YearObtained, CreditLine, DepartmentName, ArtistName, AcquisitionMethodName, CultureName, PeriodName
FROM Object
LEFT JOIN Department USING (DepartmentID)
LEFT JOIN Artist USING (ArtistID)
LEFT JOIN AcquisitionMethod USING (AcquisitionMethodID)
LEFT JOIN Culture USING (CultureID)
LEFT JOIN Period USING (PeriodID)
`;
    let values = [];
    let filtered = false;
    if (departments.length > 0) {
        query += ` WHERE DepartmentName IN (?)`;
        values.push(departments);
        filtered = true;
    }
    if (cultures.length > 0) {
        query += `${filtered ? ' AND' : ' WHERE'} CultureName IN (?)`;
        values.push(cultures);
        filtered = true;
    }
    if (periods.length > 0) {
        query += `${filtered ? ' AND' : ' WHERE'} PeriodName IN (?)`;
        values.push(periods);
        filtered = true;
    }
    if (classifications.length > 0) {
        query += `${filtered ? ' AND' : ' WHERE'} Classification IN (?)`;
        values.push(classifications);
        filtered = true;
    }
    if (acquisitionMethods.length > 0) {
        query += `${filtered ? ' AND' : ' WHERE'} AcquisitionMethodName IN (?)`;
        values.push(acquisitionMethods);
        filtered = true;
    }
    if (keywords) {
        // Validate keywords using regex: only allow selected characters and length <= 100
        const keywordsRegex = /^[a-zA-Z0-9\s.,&-]{1,100}$/;
        if (!keywordsRegex.test(keywords)) {
            return res.status(400).send('Invalid keywords');
        }
        query += `${filtered ? ' AND' : ' WHERE'} (AccessionNumber LIKE ? OR ArtistName LIKE ? OR Title LIKE ? OR ObjectName LIKE ? OR Dated LIKE ? OR Description LIKE ? OR Materials LIKE ? OR CreditLine LIKE ? OR eMuseumLabelText LIKE ?)`;
        for (let i = 0; i < 9; i++) {
            values.push(`%${keywords}%`);
        }
    }
    query += ' LIMIT 100';      // Limit to 100 rows
    db.query(query, values, (err, rows) => {
        if (err) {
            logError(err, res);
            return;
        }
        res.json(rows);
    });
});

// Get unique values for each attribute
app.get('/get_unique_departments', (req, res) => {
    db.query('SELECT DISTINCT DepartmentName FROM Department', (err, rows) => {
        if (err) {
            logError(err, res);
            return;
        }
        res.send(rows.map(row => row['DepartmentName']));
    });
});

app.get('/get_unique_classifications', (req, res) => {
    db.query('SELECT DISTINCT Classification FROM Object', (err, rows) => {
        if (err) {
            logError(err, res);
            return;
        }
        res.send(rows.map(row => row['Classification']));
    });
});

app.get('/get_Unique_acquisitionMethods', (req, res) => {
    db.query('SELECT AcquisitionMethodName FROM AcquisitionMethod', (err, rows) => {
        if (err) {
            logError(err, res);
            return;
        }
        res.send(rows.map(row => row['AcquisitionMethodName']));
    });
});

app.get('/get_unique_cultures', (req, res) => {
    db.query('SELECT CultureName FROM Culture', (err, rows) => {
        if (err) {
            logError(err, res);
            return;
        }
        res.send(rows.map(row => row['CultureName']));
    });
});

app.get('/get_unique_periods', (req, res) => {
    db.query('SELECT PeriodName FROM Period', (err, rows) => {
        if (err) {
            logError(err, res);
            return;
        }
        res.send(rows.map(row => row['PeriodName']));
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://${process.env.DB_HOST}:${PORT}`);
});

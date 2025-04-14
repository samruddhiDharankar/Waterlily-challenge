const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = 5000;

app.use(
  cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json());
const prisma = new PrismaClient();

app.get("/api/users", async (req, res) => {
  const { email } = req.query;
  if (email) {
    const userData = await prisma.user.findUnique({
      where: { email },
    });
    if (userData) {
      return res.status(200).json(userData);
    }
    return res.status(400).json({ message: "User not found" });
  } else {
    const userData = await prisma.user.findMany();
    return res.status(200).json(userData);
  }
});

app.post("/api/users", async (req, res) => {
  const {
    email,
    fullname,
    age,
    gender,
    maritalStatus,
    employmentStatus,
    zipcode,
  } = req.body;

  const createUser = await prisma.user.create({
    data: {
      email,
      fullname,
      age,
      gender,
      maritalStatus,
      employmentStatus,
      zipcode,
    },
  });
  return res.status(201).json("User created");
});

app.get("/api/user-health", async (req, res) => {
  const { email } = req.query;
  if (email) {
    const userData = await prisma.healthDetails.findUnique({
      where: { userEmail: email },
    });
    if (userData) {
      return res.status(200).json(userData);
    }
    return res.status(400).json({ message: "User health detail not found" });
  } else {
    const userData = await prisma.healthDetails.findMany();
    return res.status(200).json(userData);
  }
});

app.post("/api/user-health", async (req, res) => {
  const { email, chronicCondition, healthInsurance } = req.body;
  const createHealthDetails = await prisma.healthDetails.create({
    data: {
      userEmail: email,
      chronicCondition,
      healthInsurance,
    },
  });
  return res.status(201).json("User health details created");
});

app.get("/api/user-finance", async (req, res) => {
  const { email } = req.query;
  if (email) {
    const userData = await prisma.financeDetails.findUnique({
      where: { userEmail: email },
    });
    if (userData) {
      return res.status(200).json(userData);
    }
    return res.status(400).json({ message: "User finance detail not found" });
  } else {
    const userData = await prisma.financeDetails.findMany();
    return res.status(200).json(userData);
  }
});

app.post("/api/user-finance", async (req, res) => {
  const { email, income, savingAndRetirementFunds, debt } = req.body;
  const createFinanceData = await prisma.financeDetails.create({
    data: {
      userEmail: email,
      income,
      savingAndRetirementFunds,
      debt,
    },
  });
  return res.status(201).json("User finance details created");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

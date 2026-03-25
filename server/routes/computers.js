const express = require('express');
const router = express.Router();

const computers = [
  {
    id: 1,
    name: "FutureTech Quantum X",
    cpu: "Intel Core i9-15900K (Liquid Cooled)",
    gpu: "NVIDIA RTX 5090 Ti 32GB",
    ram: "128GB DDR5 8000MHz",
    storage: "4TB NVMe Gen5 SSD",
    psu: "1200W Platinum Modular",
    benchmark: "98th Percentile",
    price: "$4,999",
    releaseDate: "Q1 2026",
    status: "Pre-Order"
  },
  {
    id: 2,
    name: "Nebula Storm Pro",
    cpu: "AMD Ryzen 9 9950X3D",
    gpu: "AMD Radeon RX 8900 XTX",
    ram: "64GB DDR5 7200MHz",
    storage: "2TB NVMe Gen5 SSD",
    psu: "1000W Gold",
    benchmark: "95th Percentile",
    price: "$3,299",
    releaseDate: "Feb 2026",
    status: "Hot Release"
  },
  {
    id: 3,
    name: "Titan Workstation v5",
    cpu: "Threadripper 7980X",
    gpu: "Dual RTX 5080 NVLink",
    ram: "256GB ECC Memory",
    storage: "8TB RAID-0 SSD",
    psu: "1600W Titanium",
    benchmark: "99th Percentile",
    price: "$8,500",
    releaseDate: "March 2026",
    status: "Coming Soon"
  }
];

// For now, we'll keep this public to test, we can add auth middleware later
router.get('/', (req, res) => {
    res.json(pcData);
});

module.exports = router;
import prisma from '../../prisma/index.ts'

async function seedSubContract() {
    await prisma.$executeRaw`INSERT INTO "driverSalary"."driver" ("name","fatherName","dateofBirth","aadharNumber","panNumber","address","mobileNumber","driverLicense","licenseExpriryDate","bankName","accountNumber","accountBranch","ifscCode", "createdAt", "updatedAt")
    VALUES ('sakthi','father',3456781,'dummyaadhar','dummypan','summa','09876543','ghj5678',4567,'newBank','2345678345678','branch','ifsc1234', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`
}
export default seedSubContract

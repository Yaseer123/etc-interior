const { PrismaClient } = require("../lib/generated/prisma");

const prisma = new PrismaClient();

async function setupAdmin() {
  try {
    console.log("Setting up admin user...");

    // Find the first user (assuming they signed in via Google)
    const user = await prisma.user.findFirst();

    if (!user) {
      console.log(
        "No users found. Please sign in with Google first, then run this script again."
      );
      return;
    }

    // Update the user to have ADMIN role
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { role: "ADMIN" },
    });

    console.log(`✅ User ${updatedUser.email} has been set as ADMIN`);
    console.log("You can now access the admin dashboard at /admin");
  } catch (error) {
    console.error("Error setting up admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

setupAdmin();

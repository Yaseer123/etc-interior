const { PrismaClient } = require("../lib/generated/prisma");

const prisma = new PrismaClient();

async function manageAdmins() {
  try {
    console.log("=== Admin User Management ===\n");

    // List all users
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log("Current users in database:");
    users.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Created: ${user.createdAt.toLocaleDateString()}`);
      console.log("");
    });

    // Get command line arguments
    const args = process.argv.slice(2);
    const command = args[0];
    const email = args[1];

    if (command === "promote" && email) {
      // Promote user to admin
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        console.log(`❌ User with email ${email} not found.`);
        return;
      }

      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { role: "ADMIN" },
      });

      console.log(`✅ User ${updatedUser.email} has been promoted to ADMIN`);
    } else if (command === "demote" && email) {
      // Demote user to regular user
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        console.log(`❌ User with email ${email} not found.`);
        return;
      }

      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { role: "USER" },
      });

      console.log(`✅ User ${updatedUser.email} has been demoted to USER`);
    } else if (command === "delete" && email) {
      // Delete user
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        console.log(`❌ User with email ${email} not found.`);
        return;
      }

      await prisma.user.delete({
        where: { email: email },
      });

      console.log(`✅ User ${email} has been deleted`);
    } else if (!command) {
      console.log("\nUsage:");
      console.log(
        "  node scripts/manage-admins.js promote <email>  - Promote user to admin"
      );
      console.log(
        "  node scripts/manage-admins.js demote <email>   - Demote admin to user"
      );
      console.log(
        "  node scripts/manage-admins.js delete <email>   - Delete user"
      );
      console.log("\nExamples:");
      console.log("  node scripts/manage-admins.js promote user@gmail.com");
      console.log("  node scripts/manage-admins.js demote admin@gmail.com");
      console.log("  node scripts/manage-admins.js delete olduser@gmail.com");
    } else {
      console.log("❌ Invalid command. Use 'promote', 'demote', or 'delete'");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

manageAdmins();

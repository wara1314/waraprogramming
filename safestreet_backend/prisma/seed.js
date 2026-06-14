const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("Memulai proses penyuntikan data SafeStreet...");
    await prisma.dangerZone.deleteMany();
    await prisma.dangerZone.createMany({
        data: [
            {
                streetName: "Jalan Limau Manis",
                dangerType: "Rawan Begal Malam",
                description: "Area jalanan sangat sepi setelah jam 10 malam dan minim pencahayaan.",
                dangerLevel: "TINGGI",
                status: "RAWAN"
            },
            {
                streetName: "Jalan Bypass",
                dangerType: "Lampu jalan Mati",
                description: "Seluruh lampu penerangan jembatan, rawan aksi tawuran remaja.",
                dangerLevel: "SEDANG",
                status: "RAWAN"
            },
            {
                streetName: "Kawasan Pasar Raya",
                dangerType: "Premanisme",
                description: "Laporan pemerasan terhadap pedagang kaki lima dan pengendara.",
                dangerLevel: "SEDANG",
                status: "DI-PATROLI"
            }
        ]
    });
    console.log("Data laporan awal SafeStreet sukses disuntikkan ke database cloud!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
const readline = require("readline");  
// Membuat interface untuk input/output terminal 
const rl = readline.createInterface({   
    input: process.stdin,   
    output: process.stdout 
});  

// Array penyimpanan data buku sementara 
let daftarBuku = [];  

// Fungsi menambah buku 
function tambahBuku(judul) {   
    const buku = {     
        id: daftarBuku.length + 1,     
        judul: judul   
    };   
    daftarBuku.push(buku);   
    console.log(`Buku "${judul}" berhasil ditambahkan.`);  
}  

// Fungsi menampilkan semua buku 
function tampilkanBuku() {   
    console.log("\n===== DAFTAR BUKU =====");   
    if (daftarBuku.length === 0) {     
        console.log("Belum ada buku.");   
    } else {     
        daftarBuku.forEach((buku) => {       
            console.log(`${buku.id}. ${buku.judul}`);     
        });   
    }
       console.log("=======================\n"); 
    }
    
    // Fungsi simulasi mengambil data buku (async) 
    function ambilDataBuku() {   
        return new Promise((resolve) => {     
            setTimeout(() => {       
                resolve("Data awal berhasil dimuat dari server.");     
            }, 1500);   
        }); 
    }  
    
    // Fungsi utama dengan input dari terminal 
    async function main() {   
        console.log("===== APLIKASI MANAJEMEN BUKU =====");    
        
        // Simulasi memuat data awal (async)   
        const pesan = await ambilDataBuku();   
        console.log(pesan);    
        
        // Meminta input judul buku dari user   
        rl.question("Masukkan judul buku: ", (judul) => {     
            tambahBuku(judul);     
            tampilkanBuku();     
            rl.close(); // tutup interface setelah selesai   
            }); 
        }  
        
        main(); 
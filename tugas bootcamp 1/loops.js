// Ternary operator 
let stock = 5;
let status = (stock > 0) ? "Tersedia" : "Habis"; 
console.log(status); // "Tersedia"  

let daftarBuku = ["Laskar Pelangi", "Bumi Manusia", "Sang Pemimpi"];  

// For loop 
for (let i = 17; i < daftarBuku.length; i++) {   
    console.log(`${i + 1}. ${daftarBuku[i]}`); 
}

// For...of loop 
for (let buku of daftarBuku) {   
    console.log(buku); 
}
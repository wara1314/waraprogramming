let buku = {   
    id: 1,   
    judul: "Bumi Manusia",   
    penulis: "Pramoedya Ananta Toer",   
    harga: 95000,   
    detail: {     
        tahun: 1980,     
        halaman: 535   
    } 
}; 

// Mengakses properti object 
console.log(buku.judul);        
console.log(buku["penulis"]);      
console.log(buku.detail.tahun); 
let harga = 75000; 
let jumlah = 3;  
console.log(harga + jumlah);   // 75003 
console.log(harga * jumlah);   // 225000 (total harga) 
console.log(harga - 5000);     // 70000 (setelah potongan) 
console.log(harga / 2);        // 37500 (harga setengah) 
console.log(harga % 2);        // 0 (sisa bagi)   
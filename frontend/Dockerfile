# Menggunakan Node.js sebagai base image untuk membangun aplikasi React
FROM node:14 as build

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json untuk menginstal dependensi terlebih dahulu
COPY package.json ./

# Menginstal dependensi
RUN npm install

# Menyalin semua kode aplikasi ke dalam container
COPY . .

# Membuild aplikasi untuk produksi
RUN npm run build

# Menggunakan server statis untuk menyajikan aplikasi React
FROM node:14-alpine

# Menginstal 'serve' untuk menyajikan aplikasi secara statis
RUN npm install -g serve

# Menyalin build hasil dari stage sebelumnya
COPY --from=build /app/build /app

# Menentukan port untuk container
EXPOSE 3000

# Menjalankan aplikasi dengan 'serve'
CMD ["serve", "-s", "/app/build", "-l", "3000"]

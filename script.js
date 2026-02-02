const form = document.getElementById('wargaForm');
const fileInput = document.getElementById('fotoKtp');
const preview = document.getElementById('preview');

fileInput.onchange = () => {
    const [file] = fileInput.files;
    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
    }
};

form.onsubmit = (e) => {
    e.preventDefault();
    const nik = document.getElementById('nik').value;
    if(nik.length !== 16) return alert("NIK harus 16 digit!");

    const btn = document.getElementById('btn-kirim');
    btn.disabled = true;
    btn.innerText = "Processing...";

    // Jika di Google Apps Script, gunakan google.script.run
    // Di sini kita asumsikan integrasi via FormObject
    google.script.run
        .withSuccessHandler(() => {
            document.getElementById('res-nama').innerText = document.getElementById('nama').value;
            document.getElementById('res-nik').innerText = "NIK " + nik;
            document.getElementById('res-alamat').innerText = document.getElementById('alamat').value;
            document.getElementById('ktp-foto-render').src = preview.src;

            document.getElementById('form-container').style.display = 'none';
            document.getElementById('ktp-card').style.display = 'block';
            document.getElementById('download-btn').style.display = 'block';
        })
        .processForm(form);
};

document.getElementById('download-btn').onclick = () => {
    html2canvas(document.getElementById('ktp-card')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Kartu_Warga.png';
        link.href = canvas.toDataURL();
        link.click();
    });
};
      

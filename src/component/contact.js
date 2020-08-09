import React, {Component} from 'react'

const Contact = () => {
  return(
    <div className="container">
      <div style={{padding: "10px", border: "1px solid #ccc"}}>
        <h1 style={{textAlign: "center"}}>Hubungi Kami</h1>
        <strong>Kantor :</strong>
        di jalan belum jadi
        <br/>
        <strong>Nomor Telepon :</strong>
        08XX-XXXX-XXXX
        <br/>
        <strong>Email :</strong>
        email@contoh.com
      
      <h1 style={{textAlign: "center"}}>Kirimkan Pesan</h1>
        <div>
          <div style={{display: "block", marginBottom: "1em"}}>
            <div style={{display: "inlineBlock", width: "150px", fontWeight: "bold", fontSize: "16px"}}>
              Nama 
            </div>
            <input style={{display: "inlineBlock"}} type="text" name="name"/>
          </div>

          <div style={{display: "block", marginBottom: "1em"}}>
            <div style={{display: "inlineBlock", width: "150px", fontWeight: "bold", fontSize: "16px"}}>
              Email 
            </div>
            <input style={{display: "inlineBlock"}} type="text" name="name"/>
          </div>

          <div style={{display: "block", marginBottom: "1em"}}>
            <div style={{display: "inlineBlock", width: "150px", fontWeight: "bold", fontSize: "16px"}}>
              Jenis Kelamin 
            </div>
            <div style={{display: "inlineBlock"}}>
              <input type="radio" id="male" name="gender" value="male"/>
              <label for="male">Laki-laki</label><br/>
              <input type="radio" id="female" name="gender" value="female"/>
              <label for="female">Perempuan</label><br/>
            </div>
          </div>

          <div style={{display: "block", marginBottom: "1em"}}>
            <div style={{display: "inlineBlock", width: "150px", fontWeight: "bold", fontSize: "16px"}}>
              Pesan Anda 
            </div>
            <textarea cols="50" rows="5"></textarea>
          </div>

          <button>
            <a href="index.html" style={{textDecoration: "none", color: "black"}}>Kirim</a>
          </button>

        </div>
    </div>
    </div>
    
  )
}

export default Contact
import { useState, useEffect } from "react";
import { getCities, getCountries } from "./api/config";
import { maskCPF, maskPhone } from "../components/Masks";

export default function Home() {
  const [citiesList, setCitiesList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [cpf, setCPF] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getCountries()
      .then((res) => setCountriesList(res.data.map((e) => e.name_ptbr)))
      .catch((err) => console.log(err));
    getCities()
      .then((res) => setCitiesList(res.data.map((e) => e.name_ptbr)))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log(data);
  };

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome</label>
            <input type="text" name="name" placeholder="Nome" required />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="seuemail@email.com"
              required
            />
          </div>
          <div>
            <label>Telefone</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              placeholder="(00) 00000-0000"
              required
            />
          </div>
          <div>
            <label>
              CPF
              <input
                type="text"
                name="cpf"
                value={cpf}
                onChange={(e) => setCPF(maskCPF(e.target.value))}
                placeholder="000.000.000-00"
                required
              />
            </label>
          </div>
          <div>
            <label>Países</label>
            <select name="country" style={{ width: "150px" }} required>
              <option value="">Selecione...</option>
              {countriesList.map((res, index) => (
                <option key={index} value={res}>
                  {res}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Cidades</label>
            <select name="city" style={{ width: "150px" }} required>
              <option value="">Selecione...</option>
              {citiesList.map((res, index) => (
                <option key={index} value={res}>
                  {res}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}

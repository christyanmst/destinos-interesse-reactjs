import { useState, useEffect } from "react";
import { getCities, getCountries } from "./api/config";

export default function Home() {
  const [citiesList, setCitiesList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    getCountries()
      .then((res) => setCountriesList(res.data))
      .catch((err) => console.log(err));
    getCities()
      .then((res) => setCitiesList(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(citiesList);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log(data);
  };

  const handleInputChange = (e) => {
    e.target.value;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Nome</label>
        <input type="text" name="name" placeholder="Nome" />
        <label>Email</label>
        <input type="email" name="email" placeholder="seuemail@email.com" />
        <label>Telefone</label>
        <input type="text" name="phone" placeholder="(00) 00000-0000" />
        <label>CPF</label>
        <input type="text" name="cpf" placeholder="000.000.000-00" />
        <label>Países</label>
        <select name="country">
          <option value="">Selecione...</option>
          {countriesList.map((res) => (
            <option key={res.id} value={res.id}>
              {res.name_ptbr}
            </option>
          ))}
        </select>
        <label>Cidades</label>
        <select name="city">
          <option value="">Selecione...</option>
          {citiesList.map((res) => (
            <option key={res.id} value={res.id}>
              {res.name_ptbr}
            </option>
          ))}
        </select>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

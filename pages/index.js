import React from "react";
import { useState, useEffect } from "react";
import { getCities, getCountries } from "./api/config";
import { maskCPF, maskPhone } from "../components/Masks";
import { Form, Label, Input, Button, FormGroup, InputGroup } from "reactstrap";

export default function Home() {
  const [citiesList, setCitiesList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);

  const [cpf, setCPF] = useState("");
  const [phone, setPhone] = useState("");

  const [city, setCity] = useState();
  const [country, setCountry] = useState();

  const [countriesSelected, setCountrieSelected] = useState([]);
  const [citiesSelectd, setCitiesSelected] = useState([]);

  const [citiesFromCountry, setCitiesFromCountry] = useState([]);

  useEffect(() => {
    getCountries()
      .then((res) => setCountriesList(res.data))
      .catch((err) => console.log(err));
    getCities()
      .then((res) => setCitiesList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  function addCountrySelected(data) {
    if (
      countriesSelected.indexOf(countriesSelected.find((c) => c == data)) !== -1
    ) {
      alert(`O país ${data} já está na lista.`);
      return;
    } else if (countriesSelected.length >= 4) {
      alert("Limite de países atingido.");
      return;
    }
    countriesSelected.push(data);
    setCountrieSelected([...countriesSelected]);
  }

  function addCitySelected(data) {
    if (citiesSelectd.indexOf(citiesSelectd.find((c) => c == data)) !== -1) {
      alert(`A cidade ${data} já está na lista.`);
      return;
    } else if (citiesSelectd.length >= 4) {
      alert("Limite de cidades atingido.");
      return;
    }
    citiesSelectd.push(data);
    setCitiesSelected([...citiesSelectd]);
  }

  return (
    <>
      <div className="form">
        <Form onSubmit={handleSave}>
          <FormGroup>
            <Label form="name">Nome</Label>
            <Input
              id="name"
              name="nome"
              placeholder="Seu nome"
              type="text"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label form="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="seuemail@email.com"
              type="email"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label form="phone">Telefone</Label>
            <Input
              id="phone"
              name="phone"
              value={phone}
              placeholder="(00) 00000-0000"
              type="text"
              maxLength={15}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label form="cpf">CPF</Label>
            <Input
              id="cpf"
              name="cpf"
              value={cpf}
              placeholder="000.000.000-00"
              type="text"
              onChange={(e) => setCPF(maskCPF(e.target.value))}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label form="country">País</Label>
            <InputGroup>
              <Input
                bsSize="sm"
                className="mb-3"
                id="country"
                type="select"
                onChange={(e) => {
                  setCountry(e.target.value);
                  console.log(citiesList.filter(c=> c.country_code == e.target.value ))
                  setCitiesFromCountry(citiesList.filter(c=> c.country_code == e.target.value ).map(c=> c.name_ptbr));
                }}
              >
                <option value="">Selecione...</option>
                {countriesList.map((res, index) => (
                  <option key={index} value={res.code}>
                    {res.name_ptbr}
                  </option>
                ))}
              </Input>
              <Button
                disabled={country ? false : true}
                className="mb-3"
                onClick={() => {
                  addCountrySelected(countriesList.filter(e => e.code ==document.querySelector("#country").value).reduce((i, a) => a.name_ptbr, 0));
                }}
              >
                Adicionar
              </Button>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label form="city">Cidade</Label>
            <InputGroup>
              <Input
                bsSize="sm"
                className="mb-3"
                id="city"
                type="select"
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Selecione...</option>
                {citiesFromCountry.map((res, index) => (
                  <option key={index} value={res}>
                    {res}
                  </option>
                ))}
              </Input>
              <Button
                disabled={city ? false : true}
                className="mb-3"
                onClick={() => {
                  addCitySelected(document.querySelector("#city").value);
                }}
              >
                Adicionar
              </Button>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>Países selecionados</Label>
            <Input
              bsSize="sm"
              className="mb-3"
              name="countries"
              type="textarea"
              value={countriesSelected}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label>Cidades Selecionadas</Label>
            <Input
              bsSize="sm"
              className="mb-3"
              name="cities"
              type="textarea"
              value={citiesSelectd}
              readOnly
            />
          </FormGroup>
          <div id="button">
            <Button 
            disabled={countriesSelected.length > 0 && citiesSelectd.length > 0 ? false : true}
            type="submit">Enviar</Button>
          </div>
        </Form>
      </div>
    </>
  );
}

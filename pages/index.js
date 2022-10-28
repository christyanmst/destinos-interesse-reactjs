import React from "react";
import { useState, useEffect } from "react";
import { getCities, getCountries } from "./api/config";
import { maskCPF, maskPhone } from "../components/Masks";
import { Form, Label, Input, Button, FormGroup, InputGroup } from "reactstrap";
import { useForm, FormProvider } from "react-hook-form";

export default function Home() {
  const [citiesList, setCitiesList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [cpf, setCPF] = useState("");
  const [phone, setPhone] = useState("");
  const [citiesSelected, setCitiesSelected] = useState([]);

  useEffect(() => {
    getCountries()
      .then((res) => setCountriesList(res.data.map((e) => e.name_ptbr)))
      .catch((err) => console.log(err));
    getCities()
      .then((res) => setCitiesList(res.data.map((e) => e.name_ptbr)))
      .catch((err) => console.log(err));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.citiesList = [];
    data.countriesList = [];
    // console.log(document.querySelector("#cpf").value);
  };

  return (
    <>
      <div className="form">
        <Form onSubmit={handleSave}>
          <FormGroup>
            <Label form="name">Nome</Label>
            <Input
              bsSize="sm"
              className="mb-3"
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
              bsSize="sm"
              className="mb-3"
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
              bsSize="sm"
              className="mb-3"
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
              bsSize="sm"
              className="mb-3"
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
            <Input
              bsSize="sm"
              className="mb-3"
              id="country"
              name="country"
              type="select"
              required
            >
              <option value="">Selecione...</option>
              {countriesList.map((res, index) => (
                <option key={index} value={res}>
                  {res}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label form="city">Cidade</Label>
            <Input
              bsSize="sm"
              className="mb-3"
              id="city"
              name="city"
              type="select"
              required
            >
              <option value="">Selecione...</option>
              {citiesList.map((res, index) => (
                <option key={index} value={res}>
                  {res}
                </option>
              ))}
            </Input>
            {/* <Button onClick={() => set}>Adicionar</Button> */}
          </FormGroup>
          <div id="button">
            <Button type="submit">SUBMIT</Button>
          </div>
        </Form>
      </div>
    </>
  );
}

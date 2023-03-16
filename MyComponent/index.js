import getTemplate from "./utils";
import '../index.css'

const template = document.createElement("template");
template.innerHTML = getTemplate();

class MyElement extends HTMLElement {
  constructor() {
    super();
    this.url =
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
    this.token = "13a7ddc5be71bc6b087b37128c0244ba9e53ec66";
    this.query = "";
    this.companies = []
    this.timeout = null;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.searchedList = this.shadowRoot.querySelector('#search-data-list')
    this.searchedWrapper = this.shadowRoot.querySelector('.search-data')
    this.listen();
  }
  listen() {
    this.shadowRoot
      .querySelector("#party")
      .addEventListener("keyup", (e) => this.onInput(e));
    this.searchedList.addEventListener('click', e => this.setCompanyData(e))
    this.setHelptText('Выберите варант или продолжите ввод')
    document.body.addEventListener('click', e => this.onBodyClick(e))
  }
  onBodyClick(e) {
    if (e.target.id === 'app' || e.target.tagName === 'BODY') {
      this.searchedWrapper.classList.remove('visible')
    }
  }
  onInput(e) {
    clearTimeout(this.timeout);
    if (!e.target.value.trim().length){
      this.searchedWrapper.classList.remove('visible')
      return
    }
    this.query = e.target.value;
    this.timeout = setTimeout(() => {
      this.showCompanies();
      clearTimeout(this.timeout);
    }, 400);
  }
  async showCompanies() {
    const data = await this.fetchData();
    const companyObjects = data?.suggestions?.map(item => new Company(item))
    this.setHelptText('Выберите варант или продолжите ввод')

    this.companies = data.suggestions
    this.searchedList.innerHTML = ''
    this.searchedWrapper.classList.add('visible')
    this.searchedList.append(...companyObjects.map(obj => obj.render()))

    if (!this.companies.length) {
      this.setHelptText('Неизвестная организация')
    }
  }
  async fetchData() {
    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + this.token
        },
        body: JSON.stringify({query: this.query})
      });
      const data = await response.json()
      return data
    } catch (e) {
      console.log(e);
    }
  }
  setCompanyData(e) {
    const choosen = this.companies.find(el => el.data.inn === e.target.dataset.inn)
    this.searchedWrapper.classList.remove('visible')
    const shortName = this.shadowRoot.querySelector('#name_short')
    const fullName = this.shadowRoot.querySelector('#name_full')
    const innKpp = this.shadowRoot.querySelector('#inn_kpp')
    const address = this.shadowRoot.querySelector('#address')
    const type = this.shadowRoot.querySelector('#type')

    shortName.value = choosen?.value || '';
    type.innerHTML = choosen.data.type === 'LEGAL' ? 'Организация (LEGAL)' : 'ИП (INDIVIDUAL)'
    fullName.value = choosen?.data?.name?.full_with_opf || ''
    innKpp.value = `${choosen.data.inn || ''} / ${choosen.data.kpp || ''}`
    address.value = choosen?.data?.address?.unrestricted_value || 'Адрес не указан'
  }
  setHelptText(text) {
    this.shadowRoot.querySelector('.search-data-help').innerHTML = text
  }
}

class Company {
  constructor(...args) {
    this.args = {
      ...args
    }
  }
  render() {
    const divElement = document.createElement('div')
    divElement.className = 'company-item'
    divElement.innerHTML = 
        ` 
          <div class="mask" data-inn=${this.args[0].data.inn}></div>
          <div class="company-name">${this.args[0].value}</div>
          <div class="comany-decs">
            <span>${this.args[0].data.inn}</span>
            <span>${this.args[0].data.name.full_with_opf}</span>
          </div>
        `
    return divElement
  }
}

window.customElements.define("my-element", MyElement);

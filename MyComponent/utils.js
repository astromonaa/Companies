export default function getTemplate() {
  return `
      <style>
          .container {
            width: 50%;
            position: relative;
          }
          
          input {
            font-size: 16px;
            padding: 4px;
            width: 95%;
          }
          
          .result {
            width: 50%;
            min-width: 300px;
          }
          
          .row {
            margin-top: 1em;
          }
          
          .row label {
            display: block;
            min-width: 10em;
          }
          
          .row input, .row textarea {
            width: 95%;
          }
          .company-name {
            text-transform: uppercase;
            color: #000;
            margin-bottom: 10px;
          }
          .comany-decs {
            display: flex;
            gap: 15px;
            align-items: center;
            opacity: 0.7;
            font-size: 13px;

          }
          .search-data {
            display: none;
            border: 1px solid black;
            width: 100%;
            padding: 5px;
            position: absolute;
            top: 70px;
            background: #fff;
            z-index: 2;
          }
          .search-data-help {
            font-style: italic;
            opacity: 0.7;
            font-size: 14px;
          }
          #search-data-list {
            max-height: 280px;
            overflow: hidden;
            overflow-y: auto;
            display: flex;
            flex-direction:column;
            gap: 15px;
            margin-top: 10px;
          }
          #search-data-list::-webkit-scrollbar {
            width: 4px;
          }
          #search-data-list::-webkit-scrollbar-thumb {
            border-radius: 100px;
            background-color: lightgray;
          }
          .company-item {
            padding: 5px 0;
            border-bottom: 1px solid lightgray;
            position: relative;
            transition: all 0.3s;
            cursor: pointer;
          }
          .company-item:hover {
            background-color: lightgray;

          }
          .visible {
            display: block;
          }
          .mask {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 3;
          }
          #type {
            font-weight: bold;
          }

          @media (max-width: 769px) {
            .container {
              width: 100%;
            }
            .result {
              width: 100%;
              min-width: auto;
            }
          }
          
          @media (max-width: 340px) {
            input {
              width: 95%;
            }
            .row input {
              width:  95%;
            }
            .company-name {
              font-size: 12px;
            }
            .company-desc {
              font-size: 11px;
            }
          }   
      </style>

      <section class="container">
        <p><strong>Компания или ИП</strong></p>
        <input id="party" name="party" type="text" placeholder="Введите название, ИНН, ОГРН или адрес организации" />
        <div class="search-data">
          <div class="search-data-help" ></div>
          <div id="search-data-list">
        </div> 
      </section>

      <section class="result">
        <p id="type"></p>
        <div class="row">
          <label>Краткое наименование</label>
          <input id="name_short">
        </div>
        <div class="row">
          <label>Полное наименование</label>
          <input id="name_full">
        </div>
        <div class="row">
          <label>ИНН / КПП</label>
          <input id="inn_kpp">
        </div>
        <div class="row">
          <label>Адрес</label>
            <input id="address">
        </div>
      </section>
  `;
}

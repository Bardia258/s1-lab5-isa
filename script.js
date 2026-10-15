const API_BASE_URL = 'https://comp4537-lab5-uaoc.onrender.com/';
const INSERT_PATH = '/lab5/api/v1/insert';
const SQL_PATH = '/lab5/api/v1/sql/';

class PatientApp {
    constructor() {
        this.insertButton = document.getElementById('insertButton');
        this.submitButton = document.getElementById('submitButton');
        this.sqlQuery = document.getElementById('sqlQuery');
        this.responseBox = document.getElementById('response');

        this.insertButton.addEventListener('click', () => this.insertPatients());
        this.submitButton.addEventListener('click', () => this.readPatients());
    }

    async insertPatients() {
        const url = API_BASE_URL + INSERT_PATH;
        await this.sendRequest(url, 'POST');
    }

    async readPatients() {
        const sql = this.sqlQuery.value.trim();

        if (sql === '') {
            this.responseBox.textContent = 'Please enter a SQL query.';
            return;
        }

        const url = API_BASE_URL + SQL_PATH + encodeURIComponent(sql);
        await this.sendRequest(url, 'GET');
    }

    async sendRequest(url, method) {
        this.responseBox.textContent = 'Loading...';

        try {
            const response = await fetch(url, { method: method });
            const result = await response.text();

            if (!response.ok) {
                this.responseBox.textContent = 'Server error (' + response.status + '): ' + result;
                return;
            }

           
            try {
                this.responseBox.textContent = JSON.stringify(JSON.parse(result), null, 2);
            } catch {
                this.responseBox.textContent = result || 'Request completed.';
            }
        } catch (error) {
            this.responseBox.textContent = 'Request failed: ' + error.message;
        }
    }
}

const app = new PatientApp();

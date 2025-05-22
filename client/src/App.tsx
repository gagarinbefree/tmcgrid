import React, {ReactElement} from 'react'
import Table from './components/table/Table'
import {AllEnterpriseModule, ModuleRegistry} from 'ag-grid-enterprise'
import axios from 'axios'

ModuleRegistry.registerModules([AllEnterpriseModule])

const baseUrl: URL = new URL(document.location.origin)
baseUrl.port = '8080'
axios.defaults.baseURL = baseUrl.toString()

console.log('app.js', [document.location, baseUrl, axios.defaults])

const App = (): ReactElement => (
    <div style={{margin: 50}}>
        <Table />
    </div>
)

export default App
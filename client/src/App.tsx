import React, {ReactElement} from 'react'
import Table from './components/table/Table'
import { AllEnterpriseModule, ModuleRegistry } from 'ag-grid-enterprise'
import axios from 'axios'

ModuleRegistry.registerModules([AllEnterpriseModule])
axios.defaults.baseURL = 'http://localhost:8080'

const App = (): ReactElement => (
    <div style={{margin: 50}}>
        <Table />
    </div>
)


export default App
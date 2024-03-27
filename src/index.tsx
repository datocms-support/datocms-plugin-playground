import {connect} from 'datocms-plugin-sdk';
import {render} from './utils/render';
import SimpleDropdown from "./entrypoints/SimpleDropdown";

connect({

    manualFieldExtensions() {
        return [
            {
                id: 'SimpleDropdown',
                name: 'Simple Dropdown',
                type: 'addon',
                fieldTypes: ['text', 'string']

            }
        ]
    },

    renderFieldExtension(id, ctx) {
        switch (id) {
            case 'SimpleDropdown':
            default:
                return render(<SimpleDropdown numberOfOptions={10} ctx={ctx}/>);
        }
    },
});

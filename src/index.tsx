import {connect} from 'datocms-plugin-sdk';
import {render} from './utils/render';
import SimpleDropdownManual from "./entrypoints/SimpleDropdownManual";
import SimpleDropdownAuto from "./entrypoints/SimpleDropdownAuto";

connect({

    manualFieldExtensions() {
        return [
            {
                id: 'SimpleDropdownManual',
                name: 'Simple Dropdown (Manual override)',
                type: 'addon',
                fieldTypes: ['text', 'string']

            },
            {
                id: 'SimpleDropdownAuto',
                name: 'Simple Dropdown (Default)',
                type: 'addon',
                fieldTypes: ['text', 'string']

            },
        ]
    },

    renderFieldExtension(id, ctx) {
        switch (id) {
            case 'SimpleDropdownManual':
                return render(<SimpleDropdownManual numberOfOptions={10} ctx={ctx}/>);
            case 'SimpleDropdownAuto':
                return render(<SimpleDropdownAuto numberOfOptions={10} ctx={ctx}/>);
        }
    },
});

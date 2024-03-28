import {RenderFieldExtensionCtx} from "datocms-plugin-sdk";
import {Canvas, SelectField} from "datocms-react-ui";
import {get} from "lodash-es";
import {useEffect, useState} from "react";

type PropTypes = {
    ctx: RenderFieldExtensionCtx;
};

type DynamicSelectOption = {
    value: string;
    label: string;
};

type DynamicSelect = {
    selection: DynamicSelectOption[];
    options: DynamicSelectOption[];
};

export function DynamicSelectField({ctx}: PropTypes) {
    // The value of the field
    const currentValue = get(ctx.formValues, ctx.fieldPath)
        ? JSON.parse(get(ctx.formValues, ctx.fieldPath) as string)
        : ({} as DynamicSelect);

    // reference to the current selected option(s), which starts out empty
    const selection: DynamicSelectOption[] = currentValue
        ? currentValue.selection
        : [];

    // all options for the user to chose from
    const options =
        currentValue && currentValue?.options
            ? currentValue.options.map((option: any) => {
                return {value: option.value, label: option.label};
            })
            : [];

    // Update the json value of the field when the user makes a selection
    const handleChange = (newValue: any) => {
        ctx.setFieldValue(
            ctx.fieldPath,
            JSON.stringify({selection: newValue, options: options})
        );
    };

    // Manage the visibility of the field editor based on currentValue.options
    /*    useEffect(() => {
            if (options.length === 0) {
                ctx.toggleField(ctx.fieldPath, false); // If I toggle it off, it never will get updated once options.length > 0
                ctx.stopAutoResizer();
                ctx.updateHeight(0);
            } else {
                ctx.toggleField(ctx.fieldPath, true); // I never reach this point
                ctx.startAutoResizer();
            }
        }, [options, ctx.fieldPath, ctx.formValues]);*/

    useEffect(() => {
        setTimeout(() => {
            if (!options.length) {
                ctx.setFieldValue(
                    ctx.fieldPath,
                    JSON.stringify({
                        "selection": [],
                        "options": [{"label": 'Cats', "value": 'cats'}, {
                            "label": 'Dogs',
                            "value": 'dogs'
                        }, {"label": 'Platypuses', "value": 'platypuses'}]
                    })
                );
            }
        }, 2000)
    }, [])

    return (
        <Canvas ctx={ctx}>
            <SelectField
                id={ctx.field.id}
                name={ctx.field.attributes.api_key}
                label={""}
                value={selection}
                selectInputProps={{
                    isMulti: false,
                    options: options,
                }}
                onChange={handleChange}
            />
            <h3>JSON for debugging</h3>
            <pre style={{background: 'cornsilk', padding: '5px'}}>
                {JSON.stringify(currentValue, null, 2)}
            </pre>
        </Canvas>
    );
}
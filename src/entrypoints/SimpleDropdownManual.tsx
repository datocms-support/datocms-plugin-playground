import React, {useState} from 'react';
import {Button, Canvas, CaretDownIcon, CaretUpIcon, Dropdown, DropdownMenu, DropdownOption,} from 'datocms-react-ui';
import 'datocms-react-ui/styles.css';
import {RenderFieldExtensionCtx} from "datocms-plugin-sdk";

// Define a type for the option structure expected in the dropdown
interface IDropdownOption {
    id: string;
    text: string;
}

// Props type definition for the component
interface IDropdownProps {
    numberOfOptions: number; // The N number of options to display
    ctx: RenderFieldExtensionCtx;
}

const SimpleDropdownManual: React.FC<IDropdownProps> = ({numberOfOptions, ctx}) => {
    // Generate an array of options based on the numberOfOptions prop
    const options: IDropdownOption[] = Array.from({length: numberOfOptions}, (_, index) => ({
        id: `option-${index + 1}`,
        text: `Option ${index + 1}`,
    }));

    const [selectedOption, setSelectedOption] = useState<IDropdownOption>(options[0]);

    const handleChange = (option: IDropdownOption) => {
        setSelectedOption(option);
        ctx.startAutoResizer(); // Shrink it back down on selection
    };

    return (
        <Canvas ctx={ctx}>
            {options.length > 1 && (
                <Dropdown
                    renderTrigger={({open, onClick}) => (
                        <Button
                            onClick={() => {
                                ctx.stopAutoResizer() // If we don't stop it, the autosizer will keep fighting us
                                ctx.setHeight(300).then(() => onClick()) // The height determines how many options are shown at once
                            }}
                            rightIcon={open ? <CaretUpIcon/> : <CaretDownIcon/>}
                        >
                            Manual iframe resizing
                        </Button>
                    )}
                >
                    <DropdownMenu>
                        {options.map((option) => (
                            <DropdownOption
                                key={option.id}
                                onClick={() => handleChange(option)}
                            >
                                {option.text}
                            </DropdownOption>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            )}
        </Canvas>
    );
};

export default SimpleDropdownManual;
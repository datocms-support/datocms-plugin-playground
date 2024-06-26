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
    };

    return (
        <Canvas ctx={ctx}>
            {options.length > 1 && (
                <Dropdown
                    renderTrigger={({open, onClick}) => (
                        <Button
                            onClick={onClick}
                            rightIcon={open ? <CaretUpIcon/> : <CaretDownIcon/>}
                        >
                            Default behavior
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
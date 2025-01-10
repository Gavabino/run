import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp,} from "@fortawesome/free-solid-svg-icons";
import {
    autoUpdate,
    FloatingPortal,
    useFloating,
    useClick,
    useDismiss,
    useInteractions,
} from "@floating-ui/react";

const Dropdown = ({deleteFunction, editFunction}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Set up floating UI
    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
    });

    // Handle interactions (click and dismiss)
    const click = useClick(context);
    const dismiss = useDismiss(context);
    const {getReferenceProps, getFloatingProps} = useInteractions([click, dismiss]);

    return (
        <div className="settings-container">
            <button
                {...getReferenceProps({
                    ref: refs.setReference,
                    onClick: () => setIsOpen(!isOpen),
                })}
                className="gear-button"
            >
                {isOpen ? <FontAwesomeIcon icon={faChevronUp}/> : <FontAwesomeIcon icon={faChevronDown}/>}
            </button>
            {isOpen && (
                <FloatingPortal>
                    <div
                        className="dropdown"
                        {...getFloatingProps({
                            ref: refs.setFloating,
                            style: floatingStyles,
                        })}
                    >
                        <button className="dropdown-button" onClick={editFunction}>
                            Edit
                        </button>
                        <button className="dropdown-button" onClick={deleteFunction}>
                            Delete
                        </button>
                    </div>
                </FloatingPortal>
            )}
        </div>
    );
};

export default Dropdown;
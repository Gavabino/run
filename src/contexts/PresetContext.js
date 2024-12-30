import {createContext, useContext, useEffect, useState} from "react";
import {addPresetDoc, doesDocumentExist, getPresets, expand} from "../utils/firestore";

const PresetContext = createContext({});
export const usePreset = () => useContext(PresetContext);
export const PresetProvider = ({children}) => {

    const [presets, setPresets] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                let doc = await getPresets();
                let data;

                if (await doesDocumentExist("presets")) {
                    data = expand(doc.data().data)[0];
                    console.log(data);
                } else {
                    await addPresetDoc([]);
                    doc = await getPresets();
                    data = expand(doc.data().data)[0];
                }

                if (isMounted) {
                    setPresets(data);
                }
            } catch (error) {
                console.error("Error fetching presets:", error);
            }
        };

        fetchData().catch((error) => {
            console.error("Error fetching presets:", error);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const addPreset = async (newWorkout) => {
        const updatedPresets = presets?.length > 0 ? [...presets, newWorkout] : [newWorkout];
        setPresets(updatedPresets);
        try {
            await addPresetDoc(updatedPresets);
        } catch (error) {
            console.error("Error saving presets:", error);
        }
    }

    const deletePreset = async (workout) => {
        console.log("Deleting preset:", workout);
        const indexToDelete = presets.findIndex(
            (w) => w === workout
        );
        if (indexToDelete === -1) {
            console.error("Workout not found in presets.");
            return;
        }
        const updatedPresets = [
            ...presets.slice(0, indexToDelete),
            ...presets.slice(indexToDelete + 1),
        ];
        setPresets(updatedPresets);
        try {
            await addPresetDoc(updatedPresets);
        } catch (error) {
            console.error("Error deleting preset:", error);
        }
    }

    const value = {
        presets,
        setPresets,
        addPreset,
        deletePreset,
    }

    return (
        <PresetContext.Provider value={value}>
            {children}
        </PresetContext.Provider>
    );
};

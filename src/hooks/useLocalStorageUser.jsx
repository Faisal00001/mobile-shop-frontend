import { useEffect, useState } from "react";

const useLocalStorageUser = () => {
    const [userInfomation, setUserInformation] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserInformation(storedUser);
        }
    }, []);

    return [userInfomation, setUserInformation];
};

export default useLocalStorageUser;
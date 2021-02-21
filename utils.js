module.exports = {
    age: function(timestamp){
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        return (month <= 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
    },
    date: function(timestamp){
        const date = new Date(timestamp);
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);
        const year = date.getUTCFullYear();

        return  {
                    day,
                    month,
                    year,
                    iso: `${year}-${month}-${day}`,
                    birthday: `${day}/${month}`
                };
    }
}
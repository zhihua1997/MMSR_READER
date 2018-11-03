import _ from "lodash";
import users from './users';

const contains = ({ key }, query) => {

    if (key.includes(query)){
        return true;
    }

    return false;
};

export const getData = (limit = 20, query = "") => {
    return new Promise((resolve, reject) =>{
        if ( query.length === 0 ){
            resolve(_.take(users));
        } else {
            const formattedQuery = query.toLowerCase();
            const results = _.filter(users, user => {
                return contains(user, formattedQuery);
            });
            resolve(_.take(results, limit ));
        }
    });
};

export default getData;
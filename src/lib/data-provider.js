import {Router} from "wpe-lightning-sdk";
import {getPopular, getDetails} from './api';

/**
 *  bind a data request to a specific route, before a page load
 *  the router will test for any data-binding. If there is, it will
 *  wait for the promise to resolve and load the correct page.
 *
 * @see docs: https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md
 *
*/
export default () => {


    Router.boot(async()=> {
        // this will always be called
    });

    /**
     * @todo: inside this data-provider for the movies route
     * you must await for the getMovies() and invoke the data on the page
     */

    Router.before("home/browse/movies", async ({page})=>{
        const assets = await getPopular('movie');
        page.data = assets;
    }, 10 * 60 /* expires */);

    Router.before("home/browse/series", async ({page})=>{
        const assets = await getPopular('tv');
        page.data = assets;
    }, 10 * 60 /* expires */);

    Router.before("details/:itemType/:itemId", async ({page, itemType, itemId})=>{
        const details = await getDetails(itemType, itemId);
        page.details = details;
    });


    /**
     * @todo:
     * add a data-provider for the new series route
     * and make sure you call grab the series from TMDBl
     * https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}
     */
}
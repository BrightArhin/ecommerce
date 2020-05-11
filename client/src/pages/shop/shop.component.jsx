import React, {useEffect} from "react"
import './shop.styles.scss'
import {Route} from 'react-router-dom'

import {fetchCollectionsStart} from "../../redux/shop/shop.actions"
import {connect} from 'react-redux'
import CollectionsOverViewContainer from "../../components/collections-overview/collections-overview.container"
import CollectionContainer from "../collection/collection.container"




const ShopPage = ({fetchCollectionsStart, match})=> {

    useEffect(()=>{
            fetchCollectionsStart()
    },[fetchCollectionsStart])

    return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverViewContainer}/>
                <Route path={`${match.path}/:collectionId`} component={CollectionContainer}/>
            </div>

        )

}



const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart : ()=> dispatch(fetchCollectionsStart())
})


export default  connect(null,mapDispatchToProps)(ShopPage)

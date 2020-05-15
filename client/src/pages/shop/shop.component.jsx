import React, {useEffect, lazy, Suspense} from "react"
import './shop.styles.scss'
import {Route} from 'react-router-dom'

import {fetchCollectionsStart} from "../../redux/shop/shop.actions"
import {connect} from 'react-redux'
import Spinner from "../../components/spinner/spinner.component"


const CollectionsOverViewContainer = lazy(()=> import('../../components/collections-overview/collections-overview.container'))
const  CollectionContainer = lazy(()=>import("../collection/collection.container"))



const ShopPage = ({fetchCollectionsStart, match})=> {

    useEffect(()=>{
            fetchCollectionsStart()
    },[fetchCollectionsStart])

    return (
            <div className="shop-page">
                <Suspense fallback={<Spinner/>}>
                    <Route exact path={`${match.path}`} component={CollectionsOverViewContainer}/>
                    <Route path={`${match.path}/:collectionId`} component={CollectionContainer}/>
                </Suspense>
            </div>

        )

}



const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart : ()=> dispatch(fetchCollectionsStart())
})


export default  connect(null,mapDispatchToProps)(ShopPage)

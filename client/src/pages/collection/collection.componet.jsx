import React from 'react'
import './collection.styles.scss'
import  CollectionItem from '../../components/collection-item/collection-item.component'
import {connect} from 'react-redux'
import {selectCollectionById} from "../../redux/shop/shop.selectors"

const CollectionPage = ({collection:{items, title}})=>(
    <div className="collection-page">
        <h1 className="title">{title}</h1>
        <div className="items">
            {
                items.map(item => (<CollectionItem key={item.id} item={item}/>))
            }
        </div>

    </div>
)

const mapStateToProps = (state, ownProps)=>({
    collection : selectCollectionById(ownProps.match.params.collectionId)(state)
})
export default connect(mapStateToProps)(CollectionPage)

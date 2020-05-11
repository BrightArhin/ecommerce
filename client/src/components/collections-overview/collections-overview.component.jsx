import React from 'react'
import './collections-overview.styles.scss'
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect"
import {selectCollectionsForPreview} from "../../redux/shop/shop.selectors"
import CollectionPreview from "../preview-collection/collection-preview.component"

const CollectionsOverview = ({collections})=> (
    <div className="collections-overview">
        {
            collections.map(({items, title, id})=>(
                <CollectionPreview key={id} title={title} items={items}/>
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections :  selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)

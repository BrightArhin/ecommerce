import {createStructuredSelector} from "reselect"
import {connect }from "react-redux"
import CollectionPage from './collection.componet'
import WithSpinner from "../../components/with-spinner/with-spinner.component"
import {selectIsCollectionsLoaded} from "../../redux/shop/shop.selectors"
import {compose} from "redux"

const mapStateToProps = createStructuredSelector({
    isLoading : (state) => !selectIsCollectionsLoaded(state)
})

const CollectionContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage)

export default CollectionContainer

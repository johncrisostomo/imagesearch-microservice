mage Search Abstraction Layer (microservice)

## Endpoints:

### /api/imagesearch/*searchTerm*?offset=*num*
This will return an array of 10 objects with the following keys:
- `url` - the complete image URL
- `snippet` - image's description
- `thumbnail` - image thumbnail
- `context` - link to the image's origin
> Try it out here:
> [https://johncrisostomo-image-search.herokuapp.com/api/imagesearch/power%20rangers?offset=10](https://johncrisostomo-image-search.herokuapp.com/api/imagesearch/kamen%20rider?offset=10)

### /api/imagesearch/latest
This endpoint will return an array of the last 10 search terms with the following keys:
- `term` - the search term
- `when` - ISO Date
> Try it out here:
> [https://johncrisostomo-image-search.herokuapp.com/api/imagesearch/power%20rangers?offset=10](https://johncrisostomo-image-search.herokuapp.com/api/imagesearch/latest)

import { useState } from "react";
import {
  searchAttractions,
  addAttractionToBucketList,
  getPhotoReference,
  ImageDisplay,
  getDescription,
} from "../../utilities/users-service";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [attractionType, setAttractionType] = useState("Attractions");
  const [descriptions, setDescriptions] = useState([]);
  const [showFullDescriptionFor, setShowFullDescriptionFor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchExecuted, setSearchExecuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const autoCloseModal = () => {
    setShowModal(false);
  };

  const fetchDescriptions = async (attractions) => {
    const descriptionPromises = attractions.map(async (attraction) => {
      try {
        const description = await getDescription(attraction.name);
        return { ...attraction, description };
      } catch (error) {
        console.error(
          `Error fetching description for ${attraction.name}: ${error}`
        );
        return attraction;
      }
    });

    const attractionsWithDescriptions = await Promise.all(descriptionPromises);
    setDescriptions(attractionsWithDescriptions);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      setNoResults(false);
      const attractions = await searchAttractions(searchInput + attractionType);
      console.log(attractions);
      if (attractions.length === 0) {
        setNoResults(true);
      }
      console.log("attractions", attractions);
      if (attractions) {
        await fetchDescriptions(attractions);
        // Retrieve photo references for each attraction
        const photoPromises = attractions.map(async (attraction) => {
          if (attraction.photos && attraction.photos.length > 0) {
            setSearchExecuted(true);
            const photoReference = attraction.photos[0].photo_reference;
            const photo = await getPhotoReference(photoReference);
            return { ...attraction, photo };
          }
          return attraction;
        });
        const attractionsWithPhotos = await Promise.all(photoPromises);
        setSearchExecuted(true);
        setSearchResults(attractionsWithPhotos);
      } else {
        console.error("Error searching attractions");
      }
    } catch (error) {
      console.error("Error performing search:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAttractionToBucketList = async (attraction) => {
    const matchingDescription = descriptions.find(
      (desc) => desc.place_id === attraction.place_id
    );
    if (matchingDescription) {
      attraction.description = matchingDescription.description;
    } else {
      attraction.description = "No description available";
    }
    try {
      const addedAttraction = await addAttractionToBucketList(attraction);
      if (addedAttraction) {
        console.log(`Added "${addedAttraction.name}" to the bucket list`);
        setShowModal(true);
        setTimeout(autoCloseModal, 2000);
      } else {
        console.error("Error adding attraction to the bucket list");
      }
    } catch (error) {
      console.error("Error adding attraction to the bucket list:", error);
    }
  };

  const handleShowMore = (placeId) => {
    setShowFullDescriptionFor((prevPlaceId) =>
      prevPlaceId === placeId ? null : placeId
    );
  };

  const renderSearchResults = () => {
    if (noResults && searchExecuted) {
      return <p>No results found.</p>;
    }

    return (
      <div>
        <div className="bg-base-100 text-white text-center text-2xl py-2 font-serif my-2">
          Fly the World, Live Your Dreams. Your Bucket List, Your Adventure!
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((result) => (
            <div key={result.place_id} className="w-96 p-4 mt-8">
              <div className="card card-compact bg-gray-700">
                <figure className="w-full h-64 relative">
                  <img
                    src={ImageDisplay(result.photo)}
                    alt={result.name}
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="text-center text-xl text-info font-semibold">
                    {result.name}
                  </h2>
                  {descriptions.map((attraction) =>
                    attraction.place_id === result.place_id ? (
                      <div key={attraction.place_id}>
                        <p className="text-justify">
                          {showFullDescriptionFor === attraction.place_id &&
                          attraction.description
                            ? attraction.description
                            : attraction.description
                            ? attraction.description.length > 200
                              ? `${attraction.description.substring(0, 200)}...`
                              : "No description available"
                            : "No description available"}
                          {attraction.description &&
                            attraction.description.length > 200 && (
                              <span className="m-2 text-blue-400">
                                <button
                                  onClick={() =>
                                    handleShowMore(attraction.place_id)
                                  }
                                >
                                  {showFullDescriptionFor ===
                                  attraction.place_id
                                    ? "Less"
                                    : "More"}
                                </button>
                              </span>
                            )}
                        </p>
                      </div>
                    ) : null
                  )}
                  <div className="card-actions justify-end mt-2">
                    <button
                      className="btn btn-accent btn-sm"
                      onClick={() => handleAddAttractionToBucketList(result)}
                    >
                      Add to Bucket List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        <span className="text-info text-2xl">Travel</span>{" "}
        <span className="text-accent text-2xl">Log</span>
      </h1>
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative">
          <PiMagnifyingGlassDuotone className="absolute top-1/2 transform -translate-y-1/2 left-3" />
          <input
            type="text"
            placeholder="Search for city here.."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-8 border rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <select
          value={attractionType}
          onChange={(e) => setAttractionType(e.target.value)}
          className="bg-gray-600 border rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 font-semibold text-info"
        >
          <option value="Attractions">Attractions</option>
          <option value="Cafe">Cafe</option>
          <option value="Eatery">Eatery</option>
          <option value="Natural Park">Natural Park</option>
          <option value="Restaurants">Restaurants</option>
          <option value="Museum">Museum</option>
          <option value="Beach">Beach</option>
          <option value="Theater">Theater</option>
          {/* Add more options here */}
        </select>
        <button
          onClick={() => handleSearch(searchInput, attractionType)}
          className="btn btn-sm hover:bg-blue-400 text-accent font-bold px-5 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </div>
      {/* Loading indicator */}
      {loading && <span className="loading loading-infinity loading-lg"></span>}

      {renderSearchResults()}
      <dialog id="my_modal_1" className="modal" open={showModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Attraction added!</h3>
          <p>The attraction has been successfully added to your bucket list.</p>
          <div className="modal-action">
            <form method="dialog">
              {/* Button to close the modal */}
              <button className="btn" onClick={autoCloseModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SearchBar;

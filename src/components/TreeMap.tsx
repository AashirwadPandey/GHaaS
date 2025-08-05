import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, TreePine, Calendar, User, Leaf, Filter, Search } from 'lucide-react';
import '../leaflet.css';

const TreeMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Create custom markers for different statuses
  const createCustomIcon = (status: string) => {
    const color = status === 'completed' ? '#10b981' : 
                  status === 'in-progress' ? '#f59e0b' : '#3b82f6';
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="marker-pin ${status}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L13.09 7.26L18 6L16.74 11.09L22 12L16.74 12.91L18 18L12.91 16.74L12 22L11.09 16.74L6 18L7.26 12.91L2 12L7.26 11.09L6 6L11.09 7.26L12 2Z"/>
          </svg>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15]
    });
  };

  // Component to set map view to Nepal and handle scroll behavior
  const SetViewToNepal = () => {
    const map = useMap();
    
    useEffect(() => {
      // Center on Nepal with appropriate zoom level
      map.setView([28.1000, 85.0000], 7);
      
      // Enable scroll wheel zoom only when map is clicked/focused
      const enableScrollZoom = () => {
        map.scrollWheelZoom.enable();
      };
      
      const disableScrollZoom = () => {
        setTimeout(() => {
          map.scrollWheelZoom.disable();
        }, 3000); // Disable after 3 seconds of inactivity
      };
      
      // Add event listeners
      map.on('click', enableScrollZoom);
      map.on('mouseout', disableScrollZoom);
      
      // Cleanup event listeners
      return () => {
        map.off('click', enableScrollZoom);
        map.off('mouseout', disableScrollZoom);
      };
    }, [map]);
    
    return null;
  };

  const locations = [
    {
      id: 1,
      lat: 27.7172,
      lng: 85.3240,
      name: 'Shivapuri National Park',
      city: 'Kathmandu, Nepal',
      trees: 150,
      treeType: 'Oak',
      plantedDate: '2024-01-15',
      donor: 'Green Nepal Foundation',
      co2Impact: 2.055,
      status: 'completed'
    },
    {
      id: 2,
      lat: 27.7500,
      lng: 85.3000,
      name: 'Nagarjun Forest Reserve',
      city: 'Kathmandu, Nepal',
      trees: 200,
      treeType: 'Dark Oak',
      plantedDate: '2024-01-20',
      donor: 'Nepal Green Initiative',
      co2Impact: 2.74,
      status: 'completed'
    },
    {
      id: 3,
      lat: 27.72596,
      lng: 85.39626,
      name: 'Gokarna Forest',
      city: 'Kathmandu, Nepal',
      trees: 75,
      treeType: 'Coniferous Pine',
      plantedDate: '2024-02-01',
      donor: 'Kageshwori Manohara Municipality',
      co2Impact: 1.03,
      status: 'in-progress'
    },
    {
      id: 4,
      lat: 27.66063,
      lng: 85.18593,
      name: 'Chandragiri Hills',
      city: 'Kathmandu, Nepal',
      trees: 300,
      treeType: 'Coniferous Pine',
      plantedDate: '2024-02-10',
      donor: 'Kabindra Group of Companies',
      co2Impact: 4.11,
      status: 'planned'
    },
    {
      id: 5,
      lat: 27.2489,
      lng: 85.5938,
      name: 'Chure Conservation Area',
      city: 'Dhanusha, Nepal',
      trees: 500,
      treeType: 'Sal (Shorea robusta)',
      plantedDate: '2024-01-30',
      donor: 'LinkWorld Foundation',
      co2Impact: 6.85,
      status: 'completed'
    },
    {
      id: 6,
      lat: 27.5000,
      lng: 84.5000,
      name: 'Thangkhola Community Forest',
      city: 'Chitwan, Nepal',
      trees: 250,
      treeType: 'Neem',
      plantedDate: '2024-02-05',
      donor: 'Korean Embassy in Nepal',
      co2Impact: 3.425,
      status: 'in-progress'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'planned': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || location.status === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Global Tree Map
        </h1>
        <p className="text-xl text-gray-600">
          Track plantation locations and their environmental impact worldwide
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="planned">Planned</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Planned</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
            <div className="h-96 relative">
              <MapContainer
                center={[28.1000, 85.0000]}
                zoom={7}
                style={{ height: '100%', width: '100%' }}
                className="rounded-2xl"
                scrollWheelZoom={false}
                doubleClickZoom={true}
                dragging={true}
                zoomControl={true}
                touchZoom={true}
                boxZoom={false}
              >
                <SetViewToNepal />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {filteredLocations.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.lat, location.lng]}
                    icon={createCustomIcon(location.status)}
                    eventHandlers={{
                      click: () => setSelectedLocation(location.id)
                    }}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <h3 className="font-bold text-gray-900 mb-2">{location.name}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Trees:</span>
                            <span className="font-semibold text-green-600">{location.trees}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">CO₂ Offset:</span>
                            <span className="font-semibold text-blue-600">{location.co2Impact}t</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(location.status)}`}>
                              {location.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                          <div className="mt-3 pt-2 border-t border-gray-100">
                            <p className="text-xs text-gray-600">
                              <strong>Type:</strong> {location.treeType}
                            </p>
                            <p className="text-xs text-gray-600">
                              <strong>Donor:</strong> {location.donor}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              
              {/* Map overlay info */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
                <p className="text-sm font-medium text-gray-900 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>Tree Plantation Sites in Nepal</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {filteredLocations.length} active sites • Click markers for details
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  💡 Click map to enable scroll zoom
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="space-y-6">
          {selectedLocation ? (
            (() => {
              const location = locations.find(l => l.id === selectedLocation);
              if (!location) return null;
              
              return (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{location.name}</h3>
                        <p className="text-gray-600">{location.city}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(location.status)}`}>
                        {location.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <TreePine className="w-6 h-6 text-green-600 mx-auto mb-1" />
                        <p className="text-2xl font-bold text-green-600">{location.trees}</p>
                        <p className="text-xs text-gray-600">Trees</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Leaf className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                        <p className="text-2xl font-bold text-blue-600">{location.co2Impact}t</p>
                        <p className="text-xs text-gray-600">CO₂ Offset</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <TreePine className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Tree Type: {location.treeType}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Planted: {new Date(location.plantedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Donor: {location.donor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Select a Location</h3>
              <p className="text-gray-600 text-sm">Click on any pin on the map to view detailed information about the tree plantation project.</p>
            </div>
          )}

          {/* Global Impact Summary */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h3 className="font-bold text-gray-900 mb-4">Global Impact</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Trees Planted</span>
                <span className="font-bold text-green-600">{locations.reduce((sum, loc) => sum + loc.trees, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total CO₂ Offset</span>
                <span className="font-bold text-blue-600">{locations.reduce((sum, loc) => sum + loc.co2Impact, 0).toFixed(1)}t</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Locations</span>
                <span className="font-bold text-purple-600">{locations.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location List */}
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
          <h2 className="text-xl font-bold text-gray-900">All Plantation Sites</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location.id)}
              className="w-full px-6 py-4 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(location.status)}`}></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{location.name}</h3>
                    <p className="text-sm text-gray-600">{location.city}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-green-600">{location.trees} trees</p>
                  <p className="text-sm text-gray-600">{location.co2Impact}t CO₂</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreeMap;
import { useState } from 'react';
import PropTypes from 'prop-types';
import countryData from '@/utils/country_data';
import ReactCountryFlag from 'react-country-flag';

const CountrySelector = ({ onSelect, onClose, show }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCountries = countryData.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.phone.includes(searchTerm)
    );

    if (!show) return null;

    return (
        <>
            <div className="modal-backdrop show" onClick={onClose}></div>
            <div
                className="modal show"
                style={{
                    display: show ? 'block' : 'none',
                    overflowY: 'auto'
                }}
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Select Country</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search country or code..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {filteredCountries.map((country) => (
                                    <div
                                        key={country.code}
                                        onClick={() => {
                                            onSelect(country);
                                            onClose();
                                        }}
                                        style={{
                                            padding: '12px',
                                            borderBottom: '1px solid #e9ecef',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <ReactCountryFlag
                                                    countryCode={country.code}
                                                    svg
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        borderRadius: '3px'
                                                    }}
                                                    title={country.name}
                                                />
                                                <div>
                                                    <div style={{ fontWeight: '500' }}>{country.name}</div>
                                                    <div style={{ fontSize: '12px', color: '#6c757d' }}>{country.code}</div>
                                                </div>
                                            </div>
                                            <span style={{ fontWeight: '600', color: '#0d6efd' }}>{country.phone}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

CountrySelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};

export default CountrySelector;

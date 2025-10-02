import React, { useState, useCallback } from 'react';
// FIX: Added the file extension (.css) to resolve the stylesheet import
import './styles.css'; 
// FIX: Added the file extensions (.jsx) to resolve component imports
import LandingPage from './components/LandingPage.jsx'; 
import UploadPanel from './components/UploadPanel.jsx'; 
import RetrievePanel from './components/RetrievePanel.jsx'; 

// --- Shared Helper Functions and Components ---

/**
 * 1. Helper function to copy text to the clipboard.
 * (Needed by UploadPanel)
 */
export const copyToClipboard = (text) => {
    try {
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy'); // Fallback command
        document.body.removeChild(tempInput);
        return true;
    } catch (err) {
        console.error('Could not copy text: ', err);
        return false;
    }
};

/**
 * 2. Shared Button Component (Used by all panels for consistent styling)
 * (Exported so other components can import it: import { IconButton } from './App.jsx';)
 */
export const IconButton = ({ onClick, color, children, type = 'button', disabled = false, className = '' }) => {
    let baseStyle = 'icon-button';
    if (color === 'green') baseStyle += ' btn-green';
    else if (color === 'purple') baseStyle += ' btn-purple';
    else if (color === 'red') baseStyle += ' btn-red';
    else if (color === 'indigo') baseStyle += ' btn-indigo';
    else if (color === 'gray') baseStyle += ' btn-gray';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${className}`}
        >
            {children}
        </button>
    );
};


// --- Main Application Component ---

const App = () => {
    // Defines the current state (which screen is active)
    const [appState, setAppState] = useState('landing'); 
    
    // State for mock data results
    const [generatedLink, setGeneratedLink] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [retrievedFileLink, setRetrievedFileLink] = useState(''); 
    const [isFetching, setIsFetching] = useState(false); // To handle loading state for API calls

    // --- State Handlers for Transitions ---
    
    const handleUploadClick = useCallback(() => setAppState('uploading'), []);
    const handleRetrieveClick = useCallback(() => setAppState('retrieving'), []);
    // Transition back to the main landing page, clearing results
    const handleBackToLanding = useCallback(() => {
        setAppState('landing');
        setGeneratedLink('');
        setGeneratedCode('');
        setRetrievedFileLink('');
        setIsFetching(false);
    }, []);

    // --- Mock API Handlers (Will be replaced by real API calls in Module 3) ---

    const handleFileUpload = useCallback((file) => {
        console.log("Mock Uploading file:", file.name);
        setIsFetching(true);
        // Simulate API call and saving data to MySQL (Module 3/4)
        setTimeout(() => {
            setGeneratedLink(`https://oci-share.com/file/${Date.now()}`); // Mock unique link
            setGeneratedCode(Math.random().toString(36).substring(2, 8).toUpperCase()); // Mock 6-char code
            setAppState('link_generated'); // Transition to link display
            setIsFetching(false);
        }, 2500); // Simulated network latency
    }, []);

    const handleCodeRetrieval = useCallback((code) => {
        console.log("Mock Retrieving with code:", code);
        setIsFetching(true);
        // Simulate API call to check MySQL for code (Module 3/4)
        setTimeout(() => {
            if (code === "MOCK123") {
                setRetrievedFileLink("https://oci-download.com/file/retrieved.pdf"); // Mock download link
                setAppState('file_retrieved'); // Transition to showing download link
            } else {
                 alert(`Error: Share code '${code}' not found.`); // Mock error handling
                 setAppState('retrieving'); // Stay on retrieve panel
            }
            setIsFetching(false);
        }, 1500); // Simulated network latency
    }, []);


    // --- Content Renderer (The Main Router) ---

    const renderContent = () => {
        // Use a switch case to determine which panel to render
        switch (appState) {
            case 'landing':
                return (
                    <LandingPage 
                        onUploadClick={handleUploadClick} 
                        onRetrieveClick={handleRetrieveClick}
                    />
                );

            case 'uploading':
            case 'link_generated':
                return (
                    <UploadPanel
                        onFileSelect={handleFileUpload}
                        onBack={handleBackToLanding}
                        link={generatedLink}
                        code={generatedCode}
                    />
                );

            case 'retrieving':
            case 'file_retrieved':
                return (
                    <RetrievePanel
                        onCodeSubmit={handleCodeRetrieval}
                        onBack={handleBackToLanding}
                        isRetrieving={isFetching}
                        downloadLink={retrievedFileLink}
                    />
                );
            
            default:
                return null;
        }
    };

    // Determine the active panel class for CSS transitions
    const getPanelClass = (state) => {
        if (state === appState || (state === 'uploading' && appState === 'link_generated') || (state === 'retrieving' && appState === 'file_retrieved')) {
            return 'panel-active';
        }
        return '';
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Cloud Document Sharing Platform</h1>
            </header>

            <main className="main-content">
                <div className={`app-panel landing ${getPanelClass('landing')}`}>
                    {renderContent()}
                </div>
                {/* Upload Panel and Link Display */}
                <div className={`app-panel upload ${getPanelClass('uploading')} ${getPanelClass('link_generated')}`}>
                    {(appState === 'uploading' || appState === 'link_generated') && renderContent()}
                </div>
                {/* Retrieve Panel and Download Display */}
                <div className={`app-panel retrieve ${getPanelClass('retrieving')} ${getPanelClass('file_retrieved')}`}>
                    {(appState === 'retrieving' || appState === 'file_retrieved') && renderContent()}
                </div>
            </main>

            <footer className="app-footer">
                <p>&copy; {new Date().getFullYear()} OCI Share MVP | Module 1 Complete</p>
            </footer>
        </div>
    );
};

export default App;

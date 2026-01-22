import React, { useEffect, useState } from 'react';
import BudgetSankey from './BudgetSankey';

const DESCRIPTIONS = {
    'Health': "Funding for NHS hospitals, GP surgeries, and medical staff.",
    'Education': "Budget for schools, universities, and early years provision.",
    'Defence': "Spending on armed forces, equipment, and national security.",
    'Social Protection': "State pensions and welfare benefits.",
    'Debt Interest': "Interest payments on national debt (non-discretionary).",
    'Other Services': "Police, prisons, local councils, courts, and foreign aid.",
    'Infrastructure': "Transport, broadband, and major capital projects.",
    'Income Tax': "Tax on personal earnings.",
    'VAT': "Tax on goods and services.",
    'Corporation Tax': "Tax on company profits.",
    'NI': "National Insurance contributions.",
    'Other Revenue': "Fuel duty, alcohol duty, and others."
};

const GovUkDashboard = ({
    state,
    initialState,
    headlines,
    toggleViewMode,
    handleReset,
    handleUpdate,
    toggleTheme,
    theme
}) => {
    // Inject GOV.UK CSS on mount, remove on unmount
    useEffect(() => {
        const link = document.createElement('link');
        link.href = '/govuk/govuk.css';
        link.rel = 'stylesheet';
        link.id = 'govuk-css';
        document.head.appendChild(link);

        const overrides = document.createElement('link');
        overrides.href = '/govuk/govuk-overrides.css';
        overrides.rel = 'stylesheet';
        overrides.id = 'govuk-overrides';
        document.head.appendChild(overrides);

        // Load GOV.UK Frontend JS for accordion
        const script = document.createElement('script');
        script.src = '/govuk/govuk.js';
        script.id = 'govuk-js';
        script.onload = () => {
            if (window.GOVUKFrontend) {
                window.GOVUKFrontend.initAll();
            }
        };
        document.body.appendChild(script);

        // Enforce light theme for GOV.UK mode
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.setAttribute('data-theme', 'light');
        document.body.classList.add('govuk-template__body');
        document.body.classList.add('js-enabled');

        return () => {
            const existingLink = document.getElementById('govuk-css');
            if (existingLink) existingLink.remove();
            const existingOverrides = document.getElementById('govuk-overrides');
            if (existingOverrides) existingOverrides.remove();
            const existingScript = document.getElementById('govuk-js');
            if (existingScript) existingScript.remove();

            // Restore previous theme
            document.documentElement.setAttribute('data-theme', theme);
            document.body.setAttribute('data-theme', theme);
            document.body.classList.remove('govuk-template__body');
            document.body.classList.remove('js-enabled');
        };
    }, [theme]);

    // Throttle headlines
    const [displayedHeadlines, setDisplayedHeadlines] = useState([]);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDisplayedHeadlines(headlines);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [headlines]);

    if (!state) return null;

    const totalExp = state.expenditure.reduce((sum, e) => sum + e.value, 0);
    const totalRev = state.revenue.reduce((sum, r) => sum + r.value, 0);
    const deficit = totalExp - totalRev;
    const isSurplus = deficit < 0;

    return (
        <div className="govuk-template__body govuk-body">
            {/* Skip Link - WCAG Requirement */}
            <a href="#main-content" className="govuk-skip-link" data-module="govuk-skip-link">
                Skip to main content
            </a>

            {/* GOV.UK Header */}
            <header className="govuk-header" role="banner" data-module="govuk-header">
                <div className="govuk-header__container govuk-width-container">
                    <div className="govuk-header__logo">
                        <a href="#" className="govuk-header__link govuk-header__link--homepage">
                            <span className="govuk-header__logotype">
                                {/* Tudor Crown SVG - Official GOV.UK */}
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    className="govuk-header__logotype-crown"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 30"
                                    height="30"
                                    width="32"
                                    style={{ marginLeft: '5px', flexShrink: 0 }}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M22.6 10.4c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m-5.9 6.7c-.9.4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m10.8-3.7c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s0 2-1 2.4m3.3 4.8c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4M17 4.7l2.3 1.2V2.5l-2.3.7-.2-.2.9-3h-3.4l.9 3-.2.2c-.1.1-2.3-.7-2.3-.7v3.4L15 4.7c.1.1.1.2.2.2l-1.3 4c-.1.2-.1.4-.1.6 0 1.1.8 2 1.9 2.2h.7c1-.2 1.9-1.1 1.9-2.1 0-.2 0-.4-.1-.6l-1.3-4c-.1-.2 0-.2.1-.3m-7.6 5.7c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s0 2-1 2.4m-5 3c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s0 2-1 2.4m-4.4 4.4c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s0 2-1 2.4M23.5 25c-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1 .4.9-.1 2-1 2.4-.9.4-2-.1-2.4-1m5.5-3.1c-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1 .4.9-.1 2-1 2.4-.9.4-2-.1-2.4-1m1.3-7.5c-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1 .4.9-.1 2-1 2.4-.9.4-2-.1-2.4-1"
                                    />
                                </svg>
                                <span className="govuk-header__logotype-text">GOV.UK</span>
                            </span>
                        </a>
                    </div>
                    <div className="govuk-header__content">
                        <a href="#" className="govuk-header__link govuk-header__service-name">
                            Budget Simulator
                        </a>
                    </div>
                </div>
            </header>

            {/* Service Navigation */}
            <div className="govuk-width-container">
                <div className="govuk-phase-banner">
                    <p className="govuk-phase-banner__content">
                        <strong className="govuk-tag govuk-phase-banner__content__tag">alpha</strong>
                        <span className="govuk-phase-banner__text">
                            This is a new service – your{' '}
                            <a className="govuk-link" href="#">feedback</a> will help us improve it.
                        </span>
                    </p>
                </div>

                {/* Mode Toggle Button */}
                <div className="govuk-!-margin-bottom-4">
                    <button
                        onClick={toggleViewMode}
                        className="govuk-button govuk-button--secondary"
                        data-module="govuk-button"
                    >
                        Switch to Cinematic Mode
                    </button>
                </div>

                {/* Main Content */}
                <main className="govuk-main-wrapper" id="main-content" role="main">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            <h1 className="govuk-heading-xl">UK Budget Simulator</h1>
                            <p className="govuk-body-l">
                                Manage the nation's finances. Balance spending, revenue, and debt to ensure the prosperity of the United Kingdom.
                            </p>
                        </div>
                    </div>

                    {/* Deficit/Surplus Warning Banner */}
                    {deficit !== 0 && (
                        <div className={`govuk-notification-banner ${isSurplus ? 'govuk-notification-banner--success' : ''}`}
                            role="region"
                            aria-labelledby="govuk-notification-banner-title"
                            data-module="govuk-notification-banner">
                            <div className="govuk-notification-banner__header">
                                <h2 className="govuk-notification-banner__title" id="govuk-notification-banner-title">
                                    {isSurplus ? 'Success' : 'Important'}
                                </h2>
                            </div>
                            <div className="govuk-notification-banner__content">
                                <p className="govuk-notification-banner__heading">
                                    {isSurplus
                                        ? `You are running a budget surplus of £${Math.abs(deficit).toFixed(0)} billion.`
                                        : `You are running a budget deficit of £${deficit.toFixed(0)} billion.`
                                    }
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="govuk-grid-row">
                        {/* Control Panel (Left Column) */}
                        <div className="govuk-grid-column-one-half">
                            <h2 className="govuk-heading-l">Spending</h2>

                            <div className="govuk-accordion" data-module="govuk-accordion" id="accordion-spending">
                                {state.expenditure.map((item, index) => (
                                    <div key={item.id} className="govuk-accordion__section">
                                        <div className="govuk-accordion__section-header">
                                            <h2 className="govuk-accordion__section-heading">
                                                <span className="govuk-accordion__section-button" id={`accordion-spending-heading-${index}`}>
                                                    {item.id}
                                                </span>
                                            </h2>
                                        </div>
                                        <div id={`accordion-spending-content-${index}`} className="govuk-accordion__section-content">
                                            <div className="govuk-form-group">
                                                <label className="govuk-label govuk-label--s" htmlFor={`slider-exp-${item.id}`}>
                                                    Budget Allocation (£{item.value.toFixed(0)}bn)
                                                </label>
                                                <div id={`slider-exp-${item.id}-hint`} className="govuk-hint">
                                                    {DESCRIPTIONS[item.id] || "Adjust funding for this department."}
                                                </div>
                                                <input
                                                    className="govuk-range-input"
                                                    id={`slider-exp-${item.id}`}
                                                    name={`slider-exp-${item.id}`}
                                                    type="range"
                                                    min="0"
                                                    max="500"
                                                    disabled={item.id === 'Debt Interest'}
                                                    value={item.value}
                                                    onChange={(e) => handleUpdate('expenditure', item.id, Number(e.target.value))}
                                                    aria-describedby={`slider-exp-${item.id}-hint`}
                                                />
                                                <div className="govuk-hint govuk-!-margin-top-2">
                                                    <span>£0bn</span>
                                                    <span className="govuk-!-font-weight-bold govuk-!-margin-left-4 govuk-!-margin-right-4">
                                                        £{item.value.toFixed(0)}bn
                                                    </span>
                                                    <span>£500bn</span>
                                                </div>
                                                {item.id === 'Debt Interest' && (
                                                    <p className="govuk-body-s govuk-!-margin-top-2">
                                                        * Debt interest is calculated automatically based on bond yields.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="govuk-heading-l govuk-!-margin-top-6">Revenue</h2>
                            <div className="govuk-accordion" data-module="govuk-accordion" id="accordion-revenue">
                                {state.revenue.map((item, index) => (
                                    <div key={item.id} className="govuk-accordion__section">
                                        <div className="govuk-accordion__section-header">
                                            <h2 className="govuk-accordion__section-heading">
                                                <span className="govuk-accordion__section-button" id={`accordion-revenue-heading-${index}`}>
                                                    {item.id}
                                                </span>
                                            </h2>
                                        </div>
                                        <div id={`accordion-revenue-content-${index}`} className="govuk-accordion__section-content">
                                            <div className="govuk-form-group">
                                                <label className="govuk-label govuk-label--s" htmlFor={`slider-rev-${item.id}`}>
                                                    Tax Revenue (£{item.value.toFixed(0)}bn)
                                                </label>
                                                <div id={`slider-rev-${item.id}-hint`} className="govuk-hint">
                                                    {DESCRIPTIONS[item.id] || "Adjust tax revenue."}
                                                </div>
                                                <input
                                                    className="govuk-range-input"
                                                    id={`slider-rev-${item.id}`}
                                                    name={`slider-rev-${item.id}`}
                                                    type="range"
                                                    min="0"
                                                    max="500"
                                                    value={item.value}
                                                    onChange={(e) => handleUpdate('revenue', item.id, Number(e.target.value))}
                                                    aria-describedby={`slider-rev-${item.id}-hint`}
                                                />
                                                <div className="govuk-hint govuk-!-margin-top-2">
                                                    <span>£0bn</span>
                                                    <span className="govuk-!-font-weight-bold govuk-!-margin-left-4 govuk-!-margin-right-4">
                                                        £{item.value.toFixed(0)}bn
                                                    </span>
                                                    <span>£500bn</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column (Visualisation) */}
                        <div className="govuk-grid-column-one-half">
                            <h2 className="govuk-heading-l">Flow of Funds</h2>

                            <p className="govuk-body">
                                This diagram shows how money flows through the UK budget. Revenue from taxes enters HM Treasury (centre),
                                then flows out to fund public services.
                            </p>

                            <details className="govuk-details" data-module="govuk-details">
                                <summary className="govuk-details__summary">
                                    <span className="govuk-details__summary-text">
                                        How to use this simulator
                                    </span>
                                </summary>
                                <div className="govuk-details__text">
                                    <ol className="govuk-list govuk-list--number">
                                        <li>Use the sliders on the left to adjust spending and revenue</li>
                                        <li>Watch how the flow diagram updates in real-time</li>
                                        <li>The footer shows your current fiscal position</li>
                                        <li>If spending exceeds revenue, you are running a deficit (shown in red)</li>
                                        <li>If revenue exceeds spending, you have a surplus (shown in green)</li>
                                    </ol>
                                    <p>Your changes affect economic indicators and may trigger news headlines based on public reaction.</p>
                                </div>
                            </details>

                            <div className="govuk-sankey-container">
                                <BudgetSankey state={state} />
                            </div>

                            <div className="govuk-warning-text govuk-!-margin-top-6">
                                <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
                                <strong className="govuk-warning-text__text">
                                    <span className="govuk-visually-hidden">Warning</span>
                                    Radical changes to the budget may cause economic instability and market volatility.
                                </strong>
                            </div>

                            {/* Intelligence Updates */}
                            <h3 className="govuk-heading-m govuk-!-margin-top-6">Intelligence Updates</h3>
                            <ul className="govuk-list govuk-list--bullet">
                                {displayedHeadlines.map((h, i) => (
                                    <li key={i} className={h.type === 'AI' ? 'govuk-!-font-weight-bold' : ''}>
                                        {h.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </main>
            </div>

            {/* Sticky Metrics Footer */}
            <div className="govuk-sticky-footer">
                <div className="govuk-width-container">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-one-third">
                            <div className="govuk-sticky-footer__item">
                                <span className="govuk-sticky-footer__label">Revenue</span>
                                <span className="govuk-sticky-footer__value">£{totalRev.toFixed(0)}bn</span>
                            </div>
                        </div>
                        <div className="govuk-grid-column-one-third">
                            <div className="govuk-sticky-footer__item">
                                <span className="govuk-sticky-footer__label">Spending</span>
                                <span className="govuk-sticky-footer__value">£{totalExp.toFixed(0)}bn</span>
                            </div>
                        </div>
                        <div className="govuk-grid-column-one-third">
                            <div className={`govuk-sticky-footer__item ${isSurplus ? 'govuk-sticky-footer__item--success' : 'govuk-sticky-footer__item--error'}`}>
                                <span className="govuk-sticky-footer__label">{isSurplus ? 'Surplus' : 'Deficit'}</span>
                                <span className="govuk-sticky-footer__value">£{Math.abs(deficit).toFixed(0)}bn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Standard Footer */}
            <footer className="govuk-footer" role="contentinfo">
                <div className="govuk-width-container">
                    <div className="govuk-footer__meta">
                        <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                className="govuk-footer__licence-logo"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 483.2 195.7"
                                height="17"
                                width="41"
                            >
                                <path
                                    fill="currentColor"
                                    d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
                                />
                            </svg>
                            <span className="govuk-footer__licence-description">
                                All content is available under the{' '}
                                <a
                                    className="govuk-footer__link"
                                    href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                                    rel="license"
                                >
                                    Open Government Licence v3.0
                                </a>
                                , except where otherwise stated
                            </span>
                        </div>
                        <div className="govuk-footer__meta-item">
                            <a
                                className="govuk-footer__link govuk-footer__copyright-logo"
                                href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
                            >
                                © Crown copyright
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default GovUkDashboard;

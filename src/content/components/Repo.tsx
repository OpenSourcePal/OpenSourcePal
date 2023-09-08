import React from 'react';

import { extractRepoNameFromUrl } from 'utils/helper';

const Repo: React.FC = () => {
    return (
        <section className="bg-brand w-full p-3 rounded-md flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <p>You are contributing to</p>
                <h2 className="font-semibold text-base">{extractRepoNameFromUrl(`${window.location.pathname}`)}</h2>
            </div>

            <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-lg">Do This First</h2>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <span>
                            <input type="checkbox" name="star" id="star" value="star" />
                            <label htmlFor="star" className="font-light text-sm">
                                Give the repo a star
                            </label>
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>
                            <input type="checkbox" name="readme" id="readme" value="readme" />
                            <label htmlFor="readme" className="font-light text-sm">
                                Read the "Readme" file
                            </label>
                        </span>
                        <button className="border-none underline underline-offset-2 bg-none text-xs font-normal">
                            Summary
                        </button>
                        {/* on click on summary should open a drop down */}
                    </div>
                    <div className="flex items-center justify-between">
                        <span>
                            <input type="checkbox" name="contributing" id="contributing" />
                            <label htmlFor="contributing" className="font-light text-sm">
                                Read the contributing file
                            </label>
                        </span>
                        <button className="border-none underline underline-offset-2 bg-none text-xs font-normal">
                            Summary
                        </button>
                        {/* on click on summary should open a drop down */}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-lg">Issues You're Assigned</h2>
                <div></div>
            </div>
        </section>
    );
};

export default Repo;

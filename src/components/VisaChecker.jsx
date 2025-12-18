import React, { useState } from 'react';

const VisaChecker = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [direction, setDirection] = useState('next'); // For animation direction

    const questions = [
        {
            id: 'age',
            text: '年齢は18歳以上ですか？',
            correctAnswer: true
        },
        {
            id: 'skill',
            text: '「技能試験（特定技能評価試験）」に合格していますか？（または技能実習2号を修了しましたか？）',
            correctAnswer: true
        },
        {
            id: 'language',
            text: '「日本語試験（N4以上またはA2以上）」に合格していますか？（または技能実習2号を修了しましたか？）',
            correctAnswer: true
        },
        {
            id: 'record',
            text: '過去に日本での強制退去処分や、犯罪歴がありますか？',
            correctAnswer: false // "No" is the correct/positive answer
        },
        {
            id: 'health',
            text: '母国で健康診断を受け、健康状態に問題はありませんか？',
            correctAnswer: true
        }
    ];

    const totalSteps = questions.length;
    const isFinished = currentStep === totalSteps;

    const handleAnswer = (value) => {
        const currentQuestion = questions[currentStep];
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));

        setDirection('next');
        // Small delay to show selection before moving
        setTimeout(() => {
            setCurrentStep(prev => prev + 1);
        }, 300);
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setDirection('back');
            setCurrentStep(prev => prev - 1);
        }
    };

    const calculateResult = () => {
        // Check if all answers match the expected callback
        const isSuccess = questions.every(q => answers[q.id] === q.correctAnswer);
        return isSuccess ? 'qualified' : 'warning';
    };

    const resultType = isFinished ? calculateResult() : null;

    // Contact URL generation
    const getContactUrl = (type) => {
        const subject = encodeURIComponent('特定技能ビザ診断結果');
        const paramResult = encodeURIComponent(type);
        return `https://mayuha.net/contact/?subject=${subject}&result=${paramResult}`;
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Progress Bar */}
            {!isFinished && (
                <div className="px-2">
                    <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                        <span>質問 {currentStep + 1} / {totalSteps}</span>
                        <span>{Math.round(((currentStep) / totalSteps) * 100)}% 完了</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${((currentStep) / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Question Card (Wizard) */}
            {!isFinished && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px] relative flex flex-col">
                    <div
                        key={currentStep}
                        className={`flex-1 flex flex-col p-8 sm:p-10 animate-in fade-in fill-mode-forwards duration-300 ${direction === 'next' ? 'slide-in-from-right-8' : 'slide-in-from-left-8'
                            }`}
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-relaxed flex-grow flex items-center justify-center text-center">
                            {questions[currentStep].text}
                        </h2>

                        <div className="mt-8 space-y-4">
                            <button
                                onClick={() => handleAnswer(true)}
                                className="w-full py-4 px-6 rounded-xl font-bold text-lg border-2 border-slate-100 text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                            >
                                はい
                            </button>
                            <button
                                onClick={() => handleAnswer(false)}
                                className="w-full py-4 px-6 rounded-xl font-bold text-lg border-2 border-slate-100 text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                            >
                                いいえ
                            </button>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="p-4 border-t border-slate-50 flex justify-start">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`flex items-center text-slate-400 hover:text-slate-600 font-medium px-4 py-2 rounded-lg transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            戻る
                        </button>
                    </div>
                </div>
            )}

            {/* Result Section */}
            {isFinished && (
                <div className="space-y-8 animate-in zoom-in-95 fade-in duration-500">
                    <div className={`rounded-2xl p-8 sm:p-10 text-center shadow-sm border ${resultType === 'qualified'
                            ? 'bg-blue-50 border-blue-100'
                            : 'bg-orange-50 border-orange-100' // Improved friendly colors
                        }`}>
                        <div className="text-6xl mb-6">
                            {resultType === 'qualified' ? '🎉' : '💡'}
                        </div>

                        <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${resultType === 'qualified' ? 'text-blue-900' : 'text-orange-900'
                            }`}>
                            {resultType === 'qualified'
                                ? 'おめでとうございます！\n特定技能ビザ取得の可能性が高いです。'
                                : '専門家の判断が必要です'
                            }
                        </h3>

                        <p className={`text-lg leading-relaxed mb-8 ${resultType === 'qualified' ? 'text-blue-700' : 'text-orange-800'
                            }`}>
                            {resultType === 'qualified'
                                ? '要件を概ね満たしています。確実に取得するために、プロのサポートをご検討ください。'
                                : '一部の要件について確認が必要な可能性がありますが、詳細なヒアリングで許可の可能性を見出せる場合もあります。'
                            }
                        </p>

                        <div className="flex justify-center">
                            <a
                                href={getContactUrl(resultType)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-transform hover:-translate-y-1 ${resultType === 'qualified'
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-200'
                                        : 'bg-gradient-to-r from-orange-400 to-orange-500 hover:shadow-orange-100' // Friendlier orange
                                    }`}
                            >
                                {resultType === 'qualified' ? '有料サポートに進む' : '無料で専門家に相談する'}
                            </a>
                        </div>
                    </div>

                    {/* Professional Service CTA Card */}
                    <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden text-white relative isolate">
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -z-10"></div>

                        <div className="p-8 sm:p-12 text-center">
                            <p className="text-blue-300 font-bold tracking-widest text-sm uppercase mb-3">Professional Support</p>
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
                                行政書士による完全申請代行
                            </h2>
                            <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                                面倒な書類作成から申請手続きまで、全てお任せください。<br />
                                経験豊富な専門家が、あなたのビザ取得を確実にサポートします。
                            </p>

                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 max-w-sm mx-auto mb-8 border border-white/10">
                                <div className="flex items-end justify-center gap-1">
                                    <span className="text-sm text-slate-300 mb-1">着手金</span>
                                    <span className="text-4xl font-bold">¥33,000</span>
                                    <span className="text-xl text-slate-300">〜</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">※ 成功報酬制プランもございます</p>
                            </div>

                            <a
                                href={getContactUrl(resultType)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                            >
                                今すぐ相談を予約する
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisaChecker;

// src/components/VisaChecker.jsx
import React, { useMemo, useState } from "react";

const VisaChecker = () => {
    // 質問ID定義
    const QUESTION_IDS = useMemo(
        () => ["age", "skill", "language", "record", "health"],
        []
    );

    // ステート管理
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({
        age: null,
        skill: null,
        language: null,
        record: null,
        health: null,
    });

    const questions = useMemo(
        () => [
            { id: "age", text: "年齢は18歳以上ですか？" },
            {
                id: "skill",
                text: "「技能試験（特定技能評価試験）」に合格していますか？（または技能実習2号を修了しましたか？）",
            },
            {
                id: "language",
                text: "「日本語試験（N4以上またはA2以上）」に合格していますか？（または技能実習2号を修了しましたか？）",
            },
            {
                id: "record",
                text: "過去に日本で強制退去処分を受けたことや、犯罪歴はありませんか？",
                hint: "※「ありません」＝「はい」を選択してください（問題がない場合）。",
            },
            {
                id: "health",
                text: "母国で健康診断を受け、健康状態に問題はありませんか？",
            },
        ],
        []
    );

    // 回答処理
    const handleAnswer = (value) => {
        const currentQuestionId = questions[currentStep].id;
        setAnswers((prev) => ({ ...prev, [currentQuestionId]: value }));

        // 次のステップへ（少し待ってから遷移）
        if (currentStep < questions.length) {
            setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, 250);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const resetAll = () => {
        setAnswers({
            age: null,
            skill: null,
            language: null,
            record: null,
            health: null,
        });
        setCurrentStep(0);
    };

    // 完了判定
    const isFinished = currentStep === questions.length;

    // 合格判定
    const isSuccess = useMemo(() => {
        if (!isFinished) return false;
        return QUESTION_IDS.every((id) => answers[id] === true);
    }, [answers, isFinished, QUESTION_IDS]);

    // 進捗率
    const progress = Math.min(100, (currentStep / questions.length) * 100);

    // ====== 結果表示コンポーネント ======
    const ResultView = () => {
        // 合格（Success）
        if (isSuccess) {
            return (
                <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-top-4 duration-500 bg-emerald-50 border-t border-emerald-100">
                    <div className="text-center space-y-4">
                        <div className="text-4xl mb-2">🎉</div>
                        <h3 className="text-2xl font-bold text-emerald-900">
                            おめでとうございます！<br />特定技能ビザ取得の可能性が高いです。
                        </h3>
                        <p className="text-emerald-800/80 text-sm leading-relaxed max-w-2xl mx-auto">
                            ※本ツールは一般的な要件チェックです。最終判断は個別事情により変動します。
                        </p>
                        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="https://calendly.com/fanvankai/30min?month=2025-12"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-transform hover:-translate-y-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-200"
                            >
                                今すぐ相談を予約する
                            </a>
                            <button
                                type="button"
                                onClick={resetAll}
                                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg text-emerald-900 bg-white border border-emerald-200 hover:bg-emerald-100 transition-colors"
                            >
                                最初からやり直す
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // 警告（Warning）
        return (
            <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-top-4 duration-500 bg-amber-50 border-t border-amber-100">
                <div className="text-center space-y-4">
                    <div className="text-4xl mb-2">⚠️</div>
                    <h3 className="text-2xl font-bold text-amber-900">
                        要件を満たしていない可能性がありますが、<br />専門家の判断が必要です。
                    </h3>
                    <p className="text-amber-900/80 text-sm leading-relaxed max-w-2xl mx-auto">
                        不合格に見えても、職種・試験ルート・個別事情によって可能性が残るケースがあります。
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="https://mayuha.net/contact-ja.html?subject=特定技能ビザ診断結果&result=warning"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-transform hover:-translate-y-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-amber-200"
                        >
                            無料で専門家に相談する
                        </a>
                        <button
                            type="button"
                            onClick={resetAll}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg text-amber-900 bg-white border border-amber-200 hover:bg-amber-100 transition-colors"
                        >
                            最初からやり直す
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // ====== メイン表示（ウィザード） ======
    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px] flex flex-col">

                {/* プログレスバー */}
                <div className="w-full bg-slate-100 h-2">
                    <div
                        className="bg-blue-600 h-2 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
                    {!isFinished ? (
                        // 質問表示モード
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="text-center space-y-2">
                                <span className="text-blue-600 font-bold text-sm tracking-wider">
                                    QUESTION {currentStep + 1} / {questions.length}
                                </span>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                                    {questions[currentStep].text}
                                </h2>
                                {questions[currentStep].hint && (
                                    <p className="text-sm text-slate-500 bg-slate-50 inline-block px-3 py-1 rounded-full">
                                        {questions[currentStep].hint}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-4 max-w-md mx-auto w-full">
                                <button
                                    type="button"
                                    onClick={() => handleAnswer(true)}
                                    className="flex-1 py-4 px-6 rounded-xl font-bold text-lg bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:translate-y-0.5 transition-all"
                                >
                                    はい
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleAnswer(false)}
                                    className="flex-1 py-4 px-6 rounded-xl font-bold text-lg bg-white border-2 border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-800 transition-all"
                                >
                                    いいえ
                                </button>
                            </div>

                            {currentStep > 0 && (
                                <div className="text-center">
                                    <button
                                        onClick={handleBack}
                                        className="text-slate-400 hover:text-slate-600 text-sm font-medium underline underline-offset-4"
                                    >
                                        前の質問に戻る
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // 結果表示モード
                        <ResultView />
                    )}
                </div>
            </div>
        </div>
    );
};

export default VisaChecker;

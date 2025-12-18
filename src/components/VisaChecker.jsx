// src/components/VisaChecker.jsx
import React, { useMemo, useState } from "react";

/**
 * 特定技能ビザ 要件判定ツール
 * - 結果画面のCTAは「JSXブロックごと完全分離」(if/else return) で実装
 * - href の三項演算子切替は禁止要件に従い未使用
 */
const VisaChecker = () => {
    // 質問ID定義（拡張しやすいように固定キーで管理）
    const QUESTION_IDS = useMemo(
        () => ["age", "skill", "language", "record", "health"],
        []
    );

    // 初期状態
    const [answers, setAnswers] = useState({
        age: null, // 18歳以上なら true
        skill: null, // 技能試験合格 or 技能実習2号修了なら true
        language: null, // 日本語試験合格 or 技能実習2号修了なら true
        record: null, // 犯罪歴・強制退去など「ない」なら true
        health: null, // 健康状態に問題ないなら true
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
                hint:
                    "※「ありません」＝「はい」を選択してください（問題がない場合）。",
            },
            {
                id: "health",
                text: "母国で健康診断を受け、健康状態に問題はありませんか？",
            },
        ],
        []
    );

    const handleAnswer = (id, value) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const resetAll = () => {
        setAnswers({
            age: null,
            skill: null,
            language: null,
            record: null,
            health: null,
        });
    };

    // 完了判定
    const isFinished = useMemo(
        () => QUESTION_IDS.every((id) => answers[id] !== null),
        [answers, QUESTION_IDS]
    );

    /**
     * 判定ロジック（必須要件）
     * - 全て true のときのみ isSuccess = true
     * - record は質問文が「ありませんか？」なので、問題がない場合に true を選ぶ仕様で統一
     */
    const isSuccess = useMemo(() => {
        if (!isFinished) return false;
        return QUESTION_IDS.every((id) => answers[id] === true);
    }, [answers, isFinished, QUESTION_IDS]);

    // 結果表示コンポーネント（CTAはif/elseでJSX完全分離）
    const ResultView = () => {
        if (!isFinished) return null;

        // ====== 合格 (Success) ======
        if (isSuccess) {
            return (
                <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-top-4 duration-500 bg-emerald-50 border-t border-emerald-100">
                    <div className="text-center space-y-4">
                        <div className="text-4xl mb-2">🎉</div>

                        <h3 className="text-2xl font-bold text-emerald-900">
                            おめでとうございます！特定技能ビザ取得の可能性が高いです。
                        </h3>

                        <p className="text-emerald-800/80 text-sm leading-relaxed max-w-2xl mx-auto">
                            ※本ツールは一般的な要件チェックです。最終判断は個別事情や提出資料により変動します。
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

        // ====== 不合格/警告 (Warning) ======
        return (
            <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-top-4 duration-500 bg-amber-50 border-t border-amber-100">
                <div className="text-center space-y-4">
                    <div className="text-4xl mb-2">⚠️</div>

                    <h3 className="text-2xl font-bold text-amber-900">
                        要件を満たしていない可能性がありますが、専門家の判断が必要です。
                    </h3>

                    <p className="text-amber-900/80 text-sm leading-relaxed max-w-2xl mx-auto">
                        不合格に見えても、職種・試験ルート・個別事情によって可能性が残るケースがあります。
                        まずは状況を整理しましょう。
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

                    <p className="text-amber-900/70 text-xs leading-relaxed max-w-2xl mx-auto">
                        ※本ツールは一般的な目安です。最終判断は個別事情や提出資料により変動します。
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* Question Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 sm:p-8 space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold text-slate-800">
                            特定技能ビザ（1号）要件チェック
                        </h2>
                        <p className="text-sm text-slate-500">
                            すべての質問に回答すると結果が表示されます。
                        </p>
                    </div>

                    <div className="space-y-6">
                        {questions.map((q) => {
                            const selected = answers[q.id];
                            return (
                                <div
                                    key={q.id}
                                    className="pb-6 border-b border-slate-100 last:border-0 last:pb-0"
                                >
                                    <p className="text-lg font-medium text-slate-700 mb-2">
                                        {q.text}
                                    </p>
                                    {q.hint ? (
                                        <p className="text-xs text-slate-500 mb-4">{q.hint}</p>
                                    ) : (
                                        <div className="mb-4" />
                                    )}

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer(q.id, true)}
                                            aria-pressed={selected === true}
                                            className={[
                                                "flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-200 border-2",
                                                selected === true
                                                    ? "bg-blue-600 border-blue-600 text-white shadow-md"
                                                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600",
                                            ].join(" ")}
                                        >
                                            はい
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleAnswer(q.id, false)}
                                            aria-pressed={selected === false}
                                            className={[
                                                "flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-200 border-2",
                                                selected === false
                                                    ? "bg-slate-900 border-slate-900 text-white shadow-md"
                                                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900",
                                            ].join(" ")}
                                        >
                                            いいえ
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Progress + Reset */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                        <div className="text-sm text-slate-500">
                            進捗：{" "}
                            <span className="font-bold text-slate-700">
                                {QUESTION_IDS.filter((id) => answers[id] !== null).length}/
                                {QUESTION_IDS.length}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={resetAll}
                            className="text-sm font-bold text-slate-600 hover:text-slate-900 underline underline-offset-4"
                        >
                            回答をリセット
                        </button>
                    </div>
                </div>

                {/* Result Section */}
                <ResultView />
            </div>

            {/* Professional Service CTA（任意：残す場合も表示は固定でOK） */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-xl overflow-hidden text-white relative">
                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-24 bg-blue-500/10 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none" />

                <div className="relative p-8 sm:p-10 text-center">
                    <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold tracking-wider mb-6 border border-blue-500/30">
                        PROFESSIONAL SERVICE
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 tracking-tight">
                        行政書士による<br className="sm:hidden" />
                        完全申請代行サポート
                    </h2>

                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                        複雑な書類作成から入国管理局への申請まで、専門家が責任を持って代行いたします。
                        <br />
                        許可取得に向けた最短ルートをご提案。
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-sm mx-auto mb-8 border border-white/10">
                        <p className="text-sm text-slate-400 mb-1">Standard Plan</p>
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-sm text-slate-300">着手金</span>
                            <span className="text-4xl font-bold text-white">¥33,000</span>
                            <span className="text-xl text-slate-300">〜</span>
                            <span className="text-xs text-slate-400">(税込)</span>
                        </div>
                    </div>

                    <a
                        href="https://mayuha.net/contact-ja.html"
                        className="inline-block w-full sm:w-auto px-10 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg shadow-white/10"
                    >
                        相談予約フォームへ
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VisaChecker;

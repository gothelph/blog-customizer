import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

interface Props {
	currentSettings: ArticleStateType;
	onSettingsChange: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = ({
	currentSettings,
	onSettingsChange,
}: Props) => {
	const [panelVisible, setPanelVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [draftSettings, setDraftSettings] = useState(currentSettings);

	useOutsideClickClose({
		isOpen: panelVisible,
		rootRef: containerRef,
		onChange: setPanelVisible,
	});

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSettingsChange(draftSettings);
	};

	const resetToDefaults = () => {
		setDraftSettings(defaultArticleState);
		onSettingsChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={panelVisible}
				onClick={() => setPanelVisible(!panelVisible)}
			/>
			<div
				className={clsx(
					styles.container,
					panelVisible && styles.container_open
				)}
				ref={containerRef}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={resetToDefaults}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={draftSettings.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(option) =>
							setDraftSettings((prev) => ({
								...prev,
								fontFamilyOption: option,
							}))
						}
					/>

					<RadioGroup
						selected={draftSettings.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(option) =>
							setDraftSettings((prev) => ({
								...prev,
								fontSizeOption: option,
							}))
						}
						name='font-size'
					/>

					<Select
						selected={draftSettings.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(option) =>
							setDraftSettings((prev) => ({
								...prev,
								fontColor: option,
							}))
						}
					/>

					<Separator />

					<Select
						selected={draftSettings.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(option) =>
							setDraftSettings((prev) => ({
								...prev,
								backgroundColor: option,
							}))
						}
					/>

					<Select
						selected={draftSettings.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(option) =>
							setDraftSettings((prev) => ({
								...prev,
								contentWidth: option,
							}))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</div>
		</>
	);
};

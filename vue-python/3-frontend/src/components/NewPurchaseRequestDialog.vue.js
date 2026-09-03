import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
const visible = defineModel({ default: false });
const formRef = ref();
const aiGenerated = ref(false);
const extracting = ref(false);
const fileList = ref([]);
const requestForm = reactive({
    rawRequirement: '',
    material: '',
    specification: '',
    quantity: undefined,
    unit: '',
    expectedDeliveryDate: '',
    purpose: '',
    preferredBrand: '',
    preferredSupplier: '',
});
const rules = {
    rawRequirement: [
        { required: true, message: '请描述采购需求', trigger: 'blur' },
        { min: 10, message: '采购描述至少 10 个字符', trigger: 'blur' },
    ],
    material: [{ required: true, message: '请选择或确认物料', trigger: 'change' }],
    specification: [{ required: true, message: '请填写规格/型号', trigger: 'blur' }],
    quantity: [{ required: true, message: '请填写采购数量', trigger: 'change' }, { type: 'number', min: 1, message: '数量必须大于 0', trigger: 'change' }],
    unit: [{ required: true, message: '请选择单位', trigger: 'change' }],
    expectedDeliveryDate: [{ required: true, message: '请选择期望交期', trigger: 'change' }],
    purpose: [{ required: true, message: '请填写采购用途', trigger: 'blur' }],
};
const handleFiles = (_, files) => { fileList.value = files; };
function reset() {
    formRef.value?.resetFields();
    fileList.value = [];
    aiGenerated.value = false;
}
function close() {
    visible.value = false;
    reset();
}
function fillExampleAiResult() {
    if (!requestForm.rawRequirement.trim()) {
        ElMessage.warning('请先输入自然语言采购需求');
        return;
    }
    extracting.value = true;
    window.setTimeout(() => {
        Object.assign(requestForm, {
            material: '耐高温深沟球轴承',
            specification: 'HTR-6205，耐温 260℃',
            quantity: 200,
            unit: '个',
            purpose: '装配线生产',
            preferredBrand: '沿用上次采购品牌（待确认）',
        });
        extracting.value = false;
        aiGenerated.value = true;
        ElMessage.success('已生成前端演示用的识别结果，请逐项确认和补充');
    }, 650);
}
async function saveDraft() {
    if (!aiGenerated.value) {
        ElMessage.warning('请先执行 AI 识别，生成结构化申请单');
        return;
    }
    const valid = await formRef.value?.validate().catch(() => false);
    if (valid)
        ElMessage.success('前端校验通过：草稿将在接入接口后保存');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    'modelValue': false,
};
const __VLS_modelEmit = defineEmits();
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['dialog-title']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-title']} */ ;
/** @type {__VLS_StyleScopedClasses['left-pane']} */ ;
/** @type {__VLS_StyleScopedClasses['section-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['section-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['section-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['field-label']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-block']} */ ;
/** @type {__VLS_StyleScopedClasses['notice']} */ ;
/** @type {__VLS_StyleScopedClasses['right-pane']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-summary']} */ ;
/** @type {__VLS_StyleScopedClasses['purchase-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['workspace']} */ ;
/** @type {__VLS_StyleScopedClasses['left-pane']} */ ;
/** @type {__VLS_StyleScopedClasses['purchase-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['left-pane']} */ ;
/** @type {__VLS_StyleScopedClasses['right-pane']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-placeholder']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClosed': {} },
    modelValue: (__VLS_ctx.visible),
    ...{ class: "purchase-dialog" },
    width: "min(1440px, 96vw)",
    top: "3vh",
    closeOnClickModal: (false),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClosed': {} },
    modelValue: (__VLS_ctx.visible),
    ...{ class: "purchase-dialog" },
    width: "min(1440px, 96vw)",
    top: "3vh",
    closeOnClickModal: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClosed: (__VLS_ctx.reset)
};
var __VLS_8 = {};
__VLS_3.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-title" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    const __VLS_9 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        type: "warning",
        effect: "light",
    }));
    const __VLS_11 = __VLS_10({
        type: "warning",
        effect: "light",
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    __VLS_12.slots.default;
    var __VLS_12;
}
const __VLS_13 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ref: "formRef",
    model: (__VLS_ctx.requestForm),
    rules: (__VLS_ctx.rules),
    labelPosition: "top",
    ...{ class: "request-form" },
}));
const __VLS_15 = __VLS_14({
    ref: "formRef",
    model: (__VLS_ctx.requestForm),
    rules: (__VLS_ctx.rules),
    labelPosition: "top",
    ...{ class: "request-form" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_17 = {};
__VLS_16.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "workspace" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "left-pane" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-heading" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "step" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
const __VLS_19 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    prop: "rawRequirement",
    label: "原始需求",
}));
const __VLS_21 = __VLS_20({
    prop: "rawRequirement",
    label: "原始需求",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
__VLS_22.slots.default;
const __VLS_23 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    modelValue: (__VLS_ctx.requestForm.rawRequirement),
    type: "textarea",
    rows: (8),
    maxlength: "1000",
    showWordLimit: true,
    placeholder: "例如：下周装配线需要 200 个耐高温轴承，跟上次采购的差不多，品牌优先用原来的。",
}));
const __VLS_25 = __VLS_24({
    modelValue: (__VLS_ctx.requestForm.rawRequirement),
    type: "textarea",
    rows: (8),
    maxlength: "1000",
    showWordLimit: true,
    placeholder: "例如：下周装配线需要 200 个耐高温轴承，跟上次采购的差不多，品牌优先用原来的。",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
var __VLS_22;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "upload-block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
const __VLS_27 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    fileList: (__VLS_ctx.fileList),
    drag: true,
    multiple: true,
    autoUpload: (false),
    accept: ".pdf,.png,.jpg,.jpeg",
    onChange: (__VLS_ctx.handleFiles),
}));
const __VLS_29 = __VLS_28({
    fileList: (__VLS_ctx.fileList),
    drag: true,
    multiple: true,
    autoUpload: (false),
    accept: ".pdf,.png,.jpg,.jpeg",
    onChange: (__VLS_ctx.handleFiles),
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
__VLS_30.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "upload-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "el-upload__tip" },
});
var __VLS_30;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "notice" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "left-actions" },
});
const __VLS_31 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    ...{ 'onClick': {} },
}));
const __VLS_33 = __VLS_32({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
let __VLS_35;
let __VLS_36;
let __VLS_37;
const __VLS_38 = {
    onClick: (__VLS_ctx.reset)
};
__VLS_34.slots.default;
var __VLS_34;
const __VLS_39 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.extracting),
}));
const __VLS_41 = __VLS_40({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.extracting),
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
let __VLS_43;
let __VLS_44;
let __VLS_45;
const __VLS_46 = {
    onClick: (__VLS_ctx.fillExampleAiResult)
};
__VLS_42.slots.default;
var __VLS_42;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "right-pane" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-heading" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "step" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
if (!__VLS_ctx.aiGenerated) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ai-placeholder" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "sparkle" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ai-summary" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
    const __VLS_47 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
        prop: "material",
        label: "物料",
    }));
    const __VLS_49 = __VLS_48({
        prop: "material",
        label: "物料",
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    __VLS_50.slots.default;
    {
        const { label: __VLS_thisSlot } = __VLS_50.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({
            ...{ class: "source" },
        });
    }
    const __VLS_51 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
        modelValue: (__VLS_ctx.requestForm.material),
    }));
    const __VLS_53 = __VLS_52({
        modelValue: (__VLS_ctx.requestForm.material),
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    __VLS_54.slots.default;
    {
        const { append: __VLS_thisSlot } = __VLS_54.slots;
        const __VLS_55 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({}));
        const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
        __VLS_58.slots.default;
        var __VLS_58;
    }
    var __VLS_54;
    var __VLS_50;
    const __VLS_59 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
        prop: "specification",
        label: "规格/型号",
    }));
    const __VLS_61 = __VLS_60({
        prop: "specification",
        label: "规格/型号",
    }, ...__VLS_functionalComponentArgsRest(__VLS_60));
    __VLS_62.slots.default;
    {
        const { label: __VLS_thisSlot } = __VLS_62.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({
            ...{ class: "source" },
        });
    }
    const __VLS_63 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        modelValue: (__VLS_ctx.requestForm.specification),
    }));
    const __VLS_65 = __VLS_64({
        modelValue: (__VLS_ctx.requestForm.specification),
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    var __VLS_62;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-row" },
    });
    const __VLS_67 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
        prop: "quantity",
        label: "数量",
    }));
    const __VLS_69 = __VLS_68({
        prop: "quantity",
        label: "数量",
    }, ...__VLS_functionalComponentArgsRest(__VLS_68));
    __VLS_70.slots.default;
    const __VLS_71 = {}.ElInputNumber;
    /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
        modelValue: (__VLS_ctx.requestForm.quantity),
        min: (1),
        precision: (0),
        controlsPosition: "right",
    }));
    const __VLS_73 = __VLS_72({
        modelValue: (__VLS_ctx.requestForm.quantity),
        min: (1),
        precision: (0),
        controlsPosition: "right",
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    var __VLS_70;
    const __VLS_75 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
        prop: "unit",
        label: "单位",
    }));
    const __VLS_77 = __VLS_76({
        prop: "unit",
        label: "单位",
    }, ...__VLS_functionalComponentArgsRest(__VLS_76));
    __VLS_78.slots.default;
    const __VLS_79 = {}.ElSelect;
    /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
        modelValue: (__VLS_ctx.requestForm.unit),
        placeholder: "请选择",
    }));
    const __VLS_81 = __VLS_80({
        modelValue: (__VLS_ctx.requestForm.unit),
        placeholder: "请选择",
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    __VLS_82.slots.default;
    const __VLS_83 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
        label: "个",
        value: "个",
    }));
    const __VLS_85 = __VLS_84({
        label: "个",
        value: "个",
    }, ...__VLS_functionalComponentArgsRest(__VLS_84));
    const __VLS_87 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
        label: "套",
        value: "套",
    }));
    const __VLS_89 = __VLS_88({
        label: "套",
        value: "套",
    }, ...__VLS_functionalComponentArgsRest(__VLS_88));
    const __VLS_91 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({
        label: "件",
        value: "件",
    }));
    const __VLS_93 = __VLS_92({
        label: "件",
        value: "件",
    }, ...__VLS_functionalComponentArgsRest(__VLS_92));
    var __VLS_82;
    var __VLS_78;
    const __VLS_95 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({
        prop: "expectedDeliveryDate",
        label: "期望交期",
    }));
    const __VLS_97 = __VLS_96({
        prop: "expectedDeliveryDate",
        label: "期望交期",
    }, ...__VLS_functionalComponentArgsRest(__VLS_96));
    __VLS_98.slots.default;
    {
        const { label: __VLS_thisSlot } = __VLS_98.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({
            ...{ class: "source" },
        });
    }
    const __VLS_99 = {}.ElDatePicker;
    /** @type {[typeof __VLS_components.ElDatePicker, typeof __VLS_components.elDatePicker, ]} */ ;
    // @ts-ignore
    const __VLS_100 = __VLS_asFunctionalComponent(__VLS_99, new __VLS_99({
        modelValue: (__VLS_ctx.requestForm.expectedDeliveryDate),
        type: "date",
        valueFormat: "YYYY-MM-DD",
        placeholder: "请选择日期",
        disabledDate: ((date) => date < new Date(new Date().setHours(0, 0, 0, 0))),
    }));
    const __VLS_101 = __VLS_100({
        modelValue: (__VLS_ctx.requestForm.expectedDeliveryDate),
        type: "date",
        valueFormat: "YYYY-MM-DD",
        placeholder: "请选择日期",
        disabledDate: ((date) => date < new Date(new Date().setHours(0, 0, 0, 0))),
    }, ...__VLS_functionalComponentArgsRest(__VLS_100));
    var __VLS_98;
    const __VLS_103 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({
        prop: "purpose",
        label: "项目/采购用途",
    }));
    const __VLS_105 = __VLS_104({
        prop: "purpose",
        label: "项目/采购用途",
    }, ...__VLS_functionalComponentArgsRest(__VLS_104));
    __VLS_106.slots.default;
    const __VLS_107 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_108 = __VLS_asFunctionalComponent(__VLS_107, new __VLS_107({
        modelValue: (__VLS_ctx.requestForm.purpose),
        placeholder: "例如：装配线生产",
    }));
    const __VLS_109 = __VLS_108({
        modelValue: (__VLS_ctx.requestForm.purpose),
        placeholder: "例如：装配线生产",
    }, ...__VLS_functionalComponentArgsRest(__VLS_108));
    var __VLS_106;
    const __VLS_111 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_112 = __VLS_asFunctionalComponent(__VLS_111, new __VLS_111({
        label: "优先品牌",
    }));
    const __VLS_113 = __VLS_112({
        label: "优先品牌",
    }, ...__VLS_functionalComponentArgsRest(__VLS_112));
    __VLS_114.slots.default;
    {
        const { label: __VLS_thisSlot } = __VLS_114.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({
            ...{ class: "source" },
        });
    }
    const __VLS_115 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
        modelValue: (__VLS_ctx.requestForm.preferredBrand),
    }));
    const __VLS_117 = __VLS_116({
        modelValue: (__VLS_ctx.requestForm.preferredBrand),
    }, ...__VLS_functionalComponentArgsRest(__VLS_116));
    var __VLS_114;
    const __VLS_119 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119({
        label: "优先供应商",
    }));
    const __VLS_121 = __VLS_120({
        label: "优先供应商",
    }, ...__VLS_functionalComponentArgsRest(__VLS_120));
    __VLS_122.slots.default;
    const __VLS_123 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_124 = __VLS_asFunctionalComponent(__VLS_123, new __VLS_123({
        modelValue: (__VLS_ctx.requestForm.preferredSupplier),
        placeholder: "可稍后选择或填写",
    }));
    const __VLS_125 = __VLS_124({
        modelValue: (__VLS_ctx.requestForm.preferredSupplier),
        placeholder: "可稍后选择或填写",
    }, ...__VLS_functionalComponentArgsRest(__VLS_124));
    var __VLS_122;
}
var __VLS_16;
{
    const { footer: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-footer" },
    });
    const __VLS_127 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127({
        ...{ 'onClick': {} },
    }));
    const __VLS_129 = __VLS_128({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_128));
    let __VLS_131;
    let __VLS_132;
    let __VLS_133;
    const __VLS_134 = {
        onClick: (__VLS_ctx.close)
    };
    __VLS_130.slots.default;
    var __VLS_130;
    const __VLS_135 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_137 = __VLS_136({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_136));
    let __VLS_139;
    let __VLS_140;
    let __VLS_141;
    const __VLS_142 = {
        onClick: (__VLS_ctx.saveDraft)
    };
    __VLS_138.slots.default;
    var __VLS_138;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['purchase-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-title']} */ ;
/** @type {__VLS_StyleScopedClasses['request-form']} */ ;
/** @type {__VLS_StyleScopedClasses['workspace']} */ ;
/** @type {__VLS_StyleScopedClasses['left-pane']} */ ;
/** @type {__VLS_StyleScopedClasses['section-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-block']} */ ;
/** @type {__VLS_StyleScopedClasses['field-label']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-title']} */ ;
/** @type {__VLS_StyleScopedClasses['el-upload__tip']} */ ;
/** @type {__VLS_StyleScopedClasses['notice']} */ ;
/** @type {__VLS_StyleScopedClasses['left-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['right-pane']} */ ;
/** @type {__VLS_StyleScopedClasses['section-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkle']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-summary']} */ ;
/** @type {__VLS_StyleScopedClasses['source']} */ ;
/** @type {__VLS_StyleScopedClasses['source']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['source']} */ ;
/** @type {__VLS_StyleScopedClasses['source']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
// @ts-ignore
var __VLS_18 = __VLS_17;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            visible: visible,
            formRef: formRef,
            aiGenerated: aiGenerated,
            extracting: extracting,
            fileList: fileList,
            requestForm: requestForm,
            rules: rules,
            handleFiles: handleFiles,
            reset: reset,
            close: close,
            fillExampleAiResult: fillExampleAiResult,
            saveDraft: saveDraft,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
